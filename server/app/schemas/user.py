"""User Pydantic Schemas"""
from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime


class UserCreate(BaseModel):
    """Schema for creating a new user"""
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
    """Schema for user login"""
    username: str
    password: str


class UserOut(BaseModel):
    """Schema for user output"""
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
    """Schema for JWT token"""
    access_token: str
    token_type: str
    must_change_password: bool = False


class TokenData(BaseModel):
    """Schema for token data"""
    username: Optional[str] = None


class PasswordChange(BaseModel):
    """Schema for password change"""
    current_password: str
    new_password: str
    confirm_password: str


class ForgotPasswordRequest(BaseModel):
    """Schema for forgot password request"""
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    """Schema for password reset"""
    token: str
    new_password: str
    confirm_password: str
