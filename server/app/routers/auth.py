"""Authentication API Router"""
import secrets
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models import User
from app.schemas import (
    UserCreate, UserOut, Token, PasswordChange,
    ForgotPasswordRequest, ResetPasswordRequest
)
from app.services.auth import (
    get_current_user, get_current_admin_user,
    authenticate_user, create_user, create_access_token,
    get_user_by_username, get_user_by_email, verify_password, get_password_hash
)
from app.config.settings import settings
from app.middleware import check_rate_limit
from app.utils.validation import validate_password_strength, validate_username

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=UserOut)
async def register(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Register a new user (admin only)"""
    # Validate username
    is_valid, error = validate_username(user.username)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error)
    
    # Check if username already exists
    if get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Check if email already exists
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Validate password strength
    is_valid, error = validate_password_strength(user.password)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error)
    
    # New users are admins by default and don't need to change password
    db_user = create_user(db, user, is_admin=True, must_change_password=False)
    return db_user


@router.post("/login", response_model=Token)
async def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login with username and password to get JWT token"""
    # Rate limiting: 5 login attempts per 15 minutes per IP
    await check_rate_limit(request, max_requests=5, window_seconds=900)
    
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "must_change_password": user.must_change_password
    }


@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current logged-in user information"""
    return current_user


@router.post("/logout")
async def logout():
    """Logout endpoint (client should delete token)"""
    return {"message": "Successfully logged out"}


@router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Change user password"""
    # Verify current password
    if not verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Verify new passwords match
    if password_data.new_password != password_data.confirm_password:
        raise HTTPException(status_code=400, detail="New passwords do not match")
    
    # Validate password strength
    is_valid, error = validate_password_strength(password_data.new_password)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error)
    
    # Get the user from the current database session
    db_user = db.query(User).filter(User.id == current_user.id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update password
    db_user.hashed_password = get_password_hash(password_data.new_password)
    db_user.must_change_password = False
    db.commit()
    db.refresh(db_user)
    
    return {"message": "Password changed successfully", "must_change_password": db_user.must_change_password}


@router.get("/users", response_model=list[UserOut])
async def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all users (admin only)"""
    users = db.query(User).order_by(User.created_at.desc()).all()
    return users


@router.patch("/users/{user_id}/toggle-active")
async def toggle_user_active(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Toggle user active status (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Prevent deactivating yourself
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot deactivate your own account")
    
    # Prevent deactivating super admins
    if user.is_super_admin:
        raise HTTPException(status_code=403, detail="Cannot deactivate super admin accounts")
    
    user.is_active = not user.is_active
    db.commit()
    db.refresh(user)
    return {
        "message": f"User {'activated' if user.is_active else 'deactivated'} successfully",
        "user": user
    }


@router.post("/forgot-password")
async def forgot_password(
    request: Request,
    req: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    """Request password reset token"""
    # Rate limiting: 3 reset attempts per hour per IP
    await check_rate_limit(request, max_requests=3, window_seconds=3600)
    
    user = get_user_by_email(db, req.email)
    if not user:
        # Don't reveal if email exists or not for security
        return {"message": "If the email exists, a reset link will be sent"}
    
    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
    db.commit()
    
    # TODO: Send email with reset link using SendGrid
    # For now, return the token (in production, this should be emailed)
    reset_link = f"http://localhost:5174/reset-password?token={reset_token}"
    print(f"🔑 Password reset link for {user.email}: {reset_link}")
    
    return {"message": "If the email exists, a reset link will be sent", "reset_link": reset_link}


@router.post("/reset-password")
async def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    """Reset password using token"""
    user = db.query(User).filter(User.reset_token == request.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Check if token is expired
    if user.reset_token_expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Verify passwords match
    if request.new_password != request.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    # Validate password strength
    is_valid, error = validate_password_strength(request.new_password)
    if not is_valid:
        raise HTTPException(status_code=400, detail=error)
    
    # Update password and clear reset token
    user.hashed_password = get_password_hash(request.new_password)
    user.reset_token = None
    user.reset_token_expiry = None
    user.must_change_password = False
    db.commit()
    
    return {"message": "Password reset successfully"}
