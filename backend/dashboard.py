from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field
from database import connect_to_db
from auth import get_current_user
import mysql.connector
from decimal import Decimal
from typing import Optional
from datetime import datetime

router = APIRouter()

class IncomeData(BaseModel):
    income: float = Field(..., gt=0)  # Доход должен быть положительным

class IncomeResponse(BaseModel):
    income: float  # Сумма всех транзакций

@router.put("/add-income")
def add_income(income: IncomeData, current_user: dict = Depends(get_current_user)):
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET income = %s WHERE login = %s", (income.income, current_user["login"]))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Пользователь не найден")
        conn.commit()
        return {"message": "Доход добавлен успешно"}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Ошибка базы данных: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@router.get("/get-income", response_model=IncomeResponse)
def get_income(current_user: dict = Depends(get_current_user)):
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT COALESCE(SUM(amount), 0) AS total_income FROM transactions WHERE login = %s",
            (current_user["login"],)
        )
        result = cursor.fetchone()
        total_income = float(result[0]) if result[0] is not None else 0.0
        return {"income": total_income}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Ошибка базы данных: {str(e)}")
    finally:
        cursor.close()
        conn.close()