import asyncio
from database import AsyncSessionLocal, engine
from sqlalchemy import text

async def test_connection():
    try:
        # Тест подключения
        async with engine.begin() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("✅ Подключение к БД работает!")
            print(f"Результат тестового запроса: {result.scalar()}")
        
        # Тест сессии
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SHOW TABLES"))
            tables = result.fetchall()
            print(f"✅ Таблицы в БД: {[table[0] for table in tables]}")
            
    except Exception as e:
        print(f"❌ Ошибка подключения к БД: {e}")
        print(f"Тип ошибки: {type(e)}")

if __name__ == "__main__":
    asyncio.run(test_connection())