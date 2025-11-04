"""Message Database Models"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.config.database import Base
import datetime


class Message(Base):
    """Contact message from website visitors"""
    __tablename__ = 'messages'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    subject = Column(String(300), nullable=True)
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    delivered = Column(Boolean, default=False)
    is_read = Column(Boolean, default=False)
    read_by_admin_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    read_at = Column(DateTime, nullable=True)
    
    # Relationships
    replies = relationship("MessageReply", back_populates="message", cascade="all, delete-orphan")
    read_by = relationship("User", foreign_keys=[read_by_admin_id])


class MessageReply(Base):
    """Admin replies to contact messages"""
    __tablename__ = 'message_replies'
    
    id = Column(Integer, primary_key=True, index=True)
    message_id = Column(Integer, ForeignKey('messages.id'), nullable=False)
    admin_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    reply_from_email = Column(String(200), nullable=False)
    reply_subject = Column(String(300), nullable=False)
    reply_body = Column(Text, nullable=False)
    sent_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    message = relationship("Message", back_populates="replies")
    admin = relationship("User", back_populates="message_replies")
