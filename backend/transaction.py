from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from database import connect_to_db
from auth import get_current_user
import mysql.connector
from typing import List


class Transaction(BaseModel):
    id: int
    amount: float
    category: str
    date: str


class TransactionsResponse(BaseModel):
    transactions: List[Transaction]


router = APIRouter()


@router.get("/get-transactions", response_model=TransactionsResponse)
def get_transactions(current_user: dict = Depends(get_current_user)):
    try:
        with connect_to_db() as conn:
            with conn.cursor(dictionary=True) as cursor:
                # Получаем user_id
                cursor.execute(
                    "SELECT id FROM users WHERE login = %s", (current_user["login"],)
                )
                user_row = cursor.fetchone()
                if not user_row:
                    raise HTTPException(
                        status_code=404, detail="Пользователь не найден"
                    )
                user_id = user_row["id"]

                # Все сделки пользователя (транзакции)
                cursor.execute(
                    """
                    SELECT t.id, t.amount, c.name AS category, t.date
                    FROM transactions t
                    JOIN categories c ON t.category_id = c.id
                    WHERE t.user_id = %s
                    ORDER BY t.date DESC
                    """,
                    (user_id,),
                )
                transactions = [
                    {
                        "id": row["id"],
                        "amount": float(row["amount"]),
                        "category": row["category"],
                        "date": (
                            row["date"].isoformat()
                            if hasattr(row["date"], "isoformat")
                            else str(row["date"])
                        ),
                    }
                    for row in cursor.fetchall()
                ]

                return {"transactions": transactions}
    except mysql.connector.Error as e:
        print(f"DB ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        print(f"GENERAL ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
