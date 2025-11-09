"""Message Pydantic Schemas"""
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
import datetime


class MessageCreate(BaseModel):
    """Schema for creating a new message"""
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Name is required')
        if len(v) > 100:
            raise ValueError('Name cannot exceed 100 characters')
        return v.strip()
    
    @field_validator('subject')
    @classmethod
    def validate_subject(cls, v):
        if v and len(v) > 200:
            raise ValueError('Subject cannot exceed 200 characters')
        return v.strip() if v else ""
    
    @field_validator('message')
    @classmethod
    def validate_message(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Message is required')
        if len(v) > 5000:
            raise ValueError('Message cannot exceed 5000 characters')
        return v.strip()


class MessageOut(BaseModel):
    """Schema for message output"""
    id: int
    name: str
    email: EmailStr
    subject: Optional[str]
    message: str
    timestamp: datetime.datetime
    delivered: bool
    is_read: bool
    read_at: Optional[datetime.datetime]
    reply_count: int = 0

    class Config:
        from_attributes = True


class MessageReplyCreate(BaseModel):
    """Schema for creating a message reply"""
    message_id: int
    reply_from_email: EmailStr
    reply_subject: str
    reply_body: str


class MessageReplyOut(BaseModel):
    """Schema for message reply output"""
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
