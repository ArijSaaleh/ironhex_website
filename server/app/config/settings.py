"""Application Settings"""
import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application configuration settings"""
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # CORS
    VITE_DEV_ORIGIN: str = os.getenv("VITE_DEV_ORIGIN", "http://localhost:5173")
    
    # SendGrid
    SENDGRID_API_KEY: str = os.getenv("SENDGRID_API_KEY", "")
    SENDGRID_FROM_EMAIL: str = os.getenv("SENDGRID_FROM_EMAIL", "noreply@ironhex-tech.com")
    SENDGRID_FROM_NAME: str = os.getenv("SENDGRID_FROM_NAME", "IRONHEX")
    
    # Email Recipients
    NOTIFICATION_EMAIL: str = os.getenv("EMAIL_TO", "contact@ironhex-tech.com")
    SUPPORT_EMAIL: str = os.getenv("SUPPORT_EMAIL", "support@ironhex-tech.com")
    
    # Application
    APP_NAME: str = "IRONHEX Messages API"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"


settings = Settings()
