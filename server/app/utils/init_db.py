"""Database Initialization Utilities"""
from sqlalchemy.orm import Session
from app.models import User
from app.services.auth import get_password_hash


def create_super_admins(db: Session) -> None:
    """
    Create default super admin users (Arij and Imen) if they don't exist.
    This runs automatically on application startup.
    """
    # Default super admin credentials
    super_admins = [
        {
            "username": "arij",
            "email": "arij@ironhex-tech.com",
            "password": "IronHex2025!",  # Change this in production!
        },
        {
            "username": "imen",
            "email": "imen@ironhex-tech.com",
            "password": "IronHex2025!",  # Change this in production!
        }
    ]
    
    for admin_data in super_admins:
        # Check if user already exists
        existing_user = db.query(User).filter(
            User.username == admin_data["username"]
        ).first()
        
        if not existing_user:
            # Create super admin user
            hashed_password = get_password_hash(admin_data["password"])
            super_admin = User(
                username=admin_data["username"],
                email=admin_data["email"],
                hashed_password=hashed_password,
                is_admin=True,
                is_super_admin=True,
                is_active=True,
                must_change_password=True  # Force password change on first login
            )
            db.add(super_admin)
            print(f"✅ Created super admin: {admin_data['username']}")
        else:
            print(f"ℹ️  Super admin already exists: {admin_data['username']}")
    
    try:
        db.commit()
        print("✅ Super admins initialized successfully!")
    except Exception as e:
        db.rollback()
        print(f"❌ Error creating super admins: {e}")
        raise


def initialize_database(db: Session) -> None:
    """
    Initialize database with default data.
    Called automatically on application startup.
    """
    create_super_admins(db)
