from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    subject = Column(String(300), nullable=True)
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    delivered = Column(Boolean, default=False)
    is_read = Column(Boolean, default=False)  # Track if message has been read
    read_by_admin_id = Column(Integer, ForeignKey('users.id'), nullable=True)  # Which admin read it
    read_at = Column(DateTime, nullable=True)  # When it was read
    
    # Relationship to replies
    replies = relationship("MessageReply", back_populates="message", cascade="all, delete-orphan")
    read_by = relationship("User", foreign_keys=[read_by_admin_id])


class MessageReply(Base):
    __tablename__ = 'message_replies'
    id = Column(Integer, primary_key=True, index=True)
    message_id = Column(Integer, ForeignKey('messages.id'), nullable=False)
    admin_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    reply_from_email = Column(String(200), nullable=False)  # Which email to send from
    reply_subject = Column(String(300), nullable=False)
    reply_body = Column(Text, nullable=False)
    sent_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    message = relationship("Message", back_populates="replies")
    admin = relationship("User", back_populates="message_replies")


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    email = Column(String(200), unique=True, nullable=False, index=True)
    hashed_password = Column(String(200), nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    is_super_admin = Column(Boolean, default=False)  # For arij and imen
    must_change_password = Column(Boolean, default=False)
    reset_token = Column(String(200), nullable=True)  # For password reset
    reset_token_expiry = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    
    # Relationship to replies
    message_replies = relationship("MessageReply", back_populates="admin")


class DemoRequest(Base):
    __tablename__ = 'demo_requests'
    id = Column(Integer, primary_key=True, index=True)
    platform_id = Column(String(100), nullable=False)  # e.g., 'elearning-platform'
    platform_name = Column(String(200), nullable=False)  # e.g., 'E-Learning Platform'
    platform_category = Column(String(100), nullable=False)  # e.g., 'Education'
    full_name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50), nullable=False)
    company_name = Column(String(200), nullable=True)
    message = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    is_read = Column(Boolean, default=False)
    read_at = Column(DateTime, nullable=True)
    status = Column(String(50), default='pending')  # pending, contacted, scheduled, completed, cancelled
    demo_scheduled_at = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)  # Admin notes
