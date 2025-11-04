"""Demo Request Pydantic Schemas"""
from pydantic import BaseModel, EmailStr
from typing import Optional
import datetime


class DemoRequestCreate(BaseModel):
    """Schema for creating a demo request"""
    platform_id: str
    platform_name: str
    platform_category: str
    full_name: str
    email: EmailStr
    phone: str
    company_name: Optional[str] = None
    message: Optional[str] = None


class DemoRequestOut(BaseModel):
    """Schema for demo request output"""
    id: int
    platform_id: str
    platform_name: str
    platform_category: str
    full_name: str
    email: EmailStr
    phone: str
    company_name: Optional[str]
    message: Optional[str]
    timestamp: datetime.datetime
    is_read: bool
    read_at: Optional[datetime.datetime]
    status: str
    demo_scheduled_at: Optional[datetime.datetime]
    notes: Optional[str]

    class Config:
        from_attributes = True


class DemoRequestUpdate(BaseModel):
    """Schema for updating demo request"""
    status: Optional[str] = None
    demo_scheduled_at: Optional[datetime.datetime] = None
    notes: Optional[str] = None
