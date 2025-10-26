from pydantic import BaseModel, EmailStr
from typing import Optional, List
import datetime

class MessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str

class MessageReplyCreate(BaseModel):
    message_id: int
    reply_from_email: EmailStr
    reply_subject: str
    reply_body: str

class MessageReplyOut(BaseModel):
    id: int
    message_id: int
    admin_id: int
    reply_from_email: EmailStr
    reply_subject: str
    reply_body: str
    sent_at: datetime.datetime

    class Config:
        from_attributes = True

class MessageReplyWithAdmin(BaseModel):
    """Reply with admin username included"""
    id: int
    message_id: int
    admin_id: int
    admin_username: str
    reply_from_email: EmailStr
    reply_subject: str
    reply_body: str
    sent_at: datetime.datetime

class MessageOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: Optional[str]
    message: str
    timestamp: datetime.datetime
    delivered: bool
    is_read: bool
    read_at: Optional[datetime.datetime]
    reply_count: int = 0  # Computed field for number of replies

    class Config:
        from_attributes = True


# User Schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if len(v) > 72:
            raise ValueError('Password cannot be longer than 72 characters (bcrypt limitation)')
        return v

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    is_admin: bool
    is_super_admin: bool
    must_change_password: bool
    created_at: datetime.datetime
    last_login: Optional[datetime.datetime]

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    must_change_password: bool = False

class TokenData(BaseModel):
    username: Optional[str] = None

class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str
    confirm_password: str
