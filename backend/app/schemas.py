from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

class GoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: Optional[bool] = False

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class GoalOut(GoalBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class ReminderBase(BaseModel):
    remind_at: str  # ISO datetime string

class ReminderCreate(ReminderBase):
    goal_id: int

class ReminderOut(ReminderBase):
    id: int
    sent: bool
    goal_id: int

    class Config:
        orm_mode = True

