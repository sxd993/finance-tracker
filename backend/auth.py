from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from database import AsyncSessionLocal, User as UserModel
from passlib.context import CryptContext
from sqlalchemy.future import select
import jwt
from datetime import datetime, timedelta

router = APIRouter()
security = HTTPBearer(auto_error=False)
pwd_context = CryptContext(schemes=["bcrypt"])
SECRET_KEY = "simple-key"

class LoginData(BaseModel):
    login: str
    password: str

class RegisterData(BaseModel):
    login: str
    name: str
    password: str

def create_token(login: str):
    return jwt.encode({"sub": login, "exp": datetime.utcnow() + timedelta(hours=24)}, SECRET_KEY)

async def get_current_user(token = Depends(security)):
    if not token:
        raise HTTPException(401, "No token")
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=["HS256"])
        login = payload.get("sub")
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(UserModel).filter_by(login=login))
            user = result.scalars().first()
            if not user:
                raise HTTPException(401, "User not found")
            return {"login": user.login, "name": user.name}
    except:
        raise HTTPException(401, "Invalid token")

@router.post("/login")
async def login(data: LoginData):
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(UserModel).filter_by(login=data.login))
        user = result.scalars().first()
        if not user or not pwd_context.verify(data.password, user.password):
            raise HTTPException(401, "Wrong login or password")
        
        return {"token": create_token(user.login), "user": {"login": user.login, "name": user.name}}

@router.post("/register")
async def register(data: RegisterData):
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(UserModel).filter_by(login=data.login))
        if result.scalars().first():
            raise HTTPException(400, "Login exists")
        
        new_user = UserModel(login=data.login, name=data.name, password=pwd_context.hash(data.password))
        session.add(new_user)
        await session.commit()
        
        return {"token": create_token(data.login), "user": {"login": data.login, "name": data.name}}

@router.get("/check")
async def check(current_user = Depends(get_current_user)):
    return {"user": current_user}