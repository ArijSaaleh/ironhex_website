"""Application Settings"""
import os
import sys
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
    
    def validate_production_settings(self):
        """
        Validate that critical settings are properly configured in production
        Raises SystemExit if validation fails
        """
        if not self.DEBUG:  # Production mode
            errors = []
            
            # Check SECRET_KEY
            if self.SECRET_KEY == "your-secret-key-change-this-in-production":
                errors.append("❌ SECRET_KEY is using default value! Set a strong random key.")
            
            if len(self.SECRET_KEY) < 32:
                errors.append("❌ SECRET_KEY is too short! Use at least 32 characters.")
            
            # Check DATABASE_URL
            if not self.DATABASE_URL:
                errors.append("❌ DATABASE_URL is not set!")
            
            # Check SendGrid (if email features are used)
            if not self.SENDGRID_API_KEY:
                print("⚠️  WARNING: SENDGRID_API_KEY is not set. Email features will not work.")
            
            # Print errors and exit if any critical issues found
            if errors:
                print("\n" + "="*60)
                print("🚨 PRODUCTION CONFIGURATION ERRORS 🚨")
                print("="*60)
                for error in errors:
                    print(error)
                print("\nPlease set the required environment variables before running in production.")
                print("="*60 + "\n")
                sys.exit(1)
            
            print("✅ Production configuration validated successfully")


settings = Settings()

# Validate settings on import if not in debug mode
if not settings.DEBUG:
    settings.validate_production_settings()
