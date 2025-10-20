from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime

class MessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str

class MessageOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: Optional[str]
    message: str
    timestamp: datetime.datetime
    delivered: bool

   # class Config:
     #   orm_mode = True
    class Config:
        from_attributes = True
