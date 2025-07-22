from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field
from database import connect_to_db
from auth import get_current_user
import mysql.connector
from decimal import Decimal
from typing import Optional, List, Dict, Any
from datetime import datetime

router = APIRouter()


class IncomeData(BaseModel):
    income: float = Field(..., gt=0)  # Доход должен быть положительным


@router.put("/add-income")
def add_income(income: IncomeData, current_user: dict = Depends(get_current_user)):
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE users SET income = %s WHERE login = %s",
            (income.income, current_user["login"]),
        )
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Пользователь не найден")
        conn.commit()
        return {"message": "Доход добавлен успешно"}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Ошибка базы данных: {str(e)}")
    finally:
        cursor.close()
        conn.close()


class CategorySummary(BaseModel):
    category: str
    total: float

class Transaction(BaseModel):
    id: int
    amount: float
    category: str
    date: str 

class ExpensesFullResponse(BaseModel):
    expenses: float
    categories: List[CategorySummary]
    transactions: List[Transaction]

@router.get("/get-expenses", response_model=ExpensesFullResponse)
def get_expenses(current_user: dict = Depends(get_current_user)):
    try:
        with connect_to_db() as conn:
            with conn.cursor(dictionary=True) as cursor:
                # Получаем user_id
                cursor.execute(
                    "SELECT id FROM users WHERE login = %s",
                    (current_user["login"],)
                )
                user_row = cursor.fetchone()
                if not user_row:
                    raise HTTPException(status_code=404, detail="Пользователь не найден")
                user_id = user_row["id"]

                # Сумма всех расходов
                cursor.execute(
                    "SELECT COALESCE(SUM(amount), 0) AS total FROM transactions WHERE user_id = %s",
                    (user_id,)
                )
                total_expenses = float(cursor.fetchone()["total"])

                # Сумма по категориям (теперь с названием категории)
                cursor.execute(
                    """
                    SELECT c.name AS category, COALESCE(SUM(t.amount), 0) AS total
                    FROM transactions t
                    JOIN categories c ON t.category_id = c.id
                    WHERE t.user_id = %s
                    GROUP BY c.name
                    """,
                    (user_id,)
                )
                categories = [
                    {"category": row["category"], "total": float(row["total"])}
                    for row in cursor.fetchall()
                ]

              
                return {
                    "expenses": total_expenses,
                    "categories": categories,
                }
    except mysql.connector.Error as e:
        print(f"DB ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        print(f"GENERAL ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

