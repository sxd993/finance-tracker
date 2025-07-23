from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field
from database import connect_to_db
from auth import get_current_user
import mysql.connector
from typing import List
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class IncomeData(BaseModel):
    income: float = Field(..., gt=0)  # Доход должен быть положительным

class CategorySummary(BaseModel):
    id: int
    name: str
    total: float

class Transaction(BaseModel):
    id: int
    amount: float
    category: str
    date: str 

class ExpensesFullResponse(BaseModel):
    expenses: float
    categories: List[CategorySummary]

@router.put("/add-income")
def add_income(income: IncomeData, current_user: dict = Depends(get_current_user)):
    try:
        with connect_to_db() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "UPDATE users SET income = %s WHERE login = %s",
                    (income.income, current_user["login"]),
                )
                if cursor.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Пользователь не найден")
                conn.commit()
                return {"message": "Доход добавлен успешно"}
    except mysql.connector.Error as e:
        logger.error(f"Database error in add_income: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ошибка базы данных: {str(e)}")

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
                logger.info(f"User ID: {user_id}")

                # Сумма всех расходов
                cursor.execute(
                    "SELECT COALESCE(SUM(amount), 0) AS total FROM transactions WHERE user_id = %s",
                    (user_id,)
                )
                total_expenses = float(cursor.fetchone()["total"])
                logger.info(f"Total expenses: {total_expenses}")

                # Сумма по категориям с LEFT JOIN для получения всех категорий
                cursor.execute(
                    """
                    SELECT c.id AS id, c.name AS name, COALESCE(SUM(t.amount), 0) AS total
                    FROM categories c
                    LEFT JOIN transactions t ON t.category_id = c.id AND t.user_id = %s
                    GROUP BY c.id, c.name
                    """,
                    (user_id,)
                )
                categories = [
                    CategorySummary(
                        id=row["id"],
                        name=row["name"],
                        total=float(row["total"])
                    )
                    for row in cursor.fetchall()
                ]
                logger.info(f"Categories fetched: {categories}")

                return {
                    "expenses": total_expenses,
                    "categories": categories,
                }
    except mysql.connector.Error as e:
        logger.error(f"Database error in get_expenses: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ошибка базы данных: {str(e)}")
    except Exception as e:
        logger.error(f"Server error in get_expenses: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ошибка сервера: {str(e)}")