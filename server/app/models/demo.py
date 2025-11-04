"""Demo Request Database Model"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from app.config.database import Base
import datetime


class DemoRequest(Base):
    """Demo requests from potential clients"""
    __tablename__ = 'demo_requests'
    
    id = Column(Integer, primary_key=True, index=True)
    platform_id = Column(String(100), nullable=False)
    platform_name = Column(String(200), nullable=False)
    platform_category = Column(String(100), nullable=False)
    full_name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50), nullable=False)
    company_name = Column(String(200), nullable=True)
    message = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    is_read = Column(Boolean, default=False)
    read_at = Column(DateTime, nullable=True)
    status = Column(String(50), default='pending')
    demo_scheduled_at = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)
