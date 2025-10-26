import os
from datetime import timedelta, datetime
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import smtplib
import ssl
from dotenv import load_dotenv
from database import init_db

load_dotenv()

import models, schemas, auth
from database import SessionLocal, engine, init_db

# initialize DB
init_db()

app = FastAPI(title='IRONHEX Messages API')

# CORS - allow Vite dev origin and any (for simplicity)
origins = [os.getenv('VITE_DEV_ORIGIN', 'http://localhost:5173'), '*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

SMTP_HOST = os.getenv('SMTP_HOST')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')
EMAIL_TO = os.getenv('EMAIL_TO')


def send_email_notification(name: str, email: str, subject: str, message: str):
    if not (SMTP_HOST and SMTP_USER and SMTP_PASS and EMAIL_TO):
        print('SMTP not configured, skipping email send')
        return False

    body = f"New contact message from {name} <{email}>\nSubject: {subject}\n\n{message}"
    email_message = f"From: {SMTP_USER}\nTo: {EMAIL_TO}\nSubject: [IRONHEX] New contact message: {subject}\n\n{body}"

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls(context=context)
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, EMAIL_TO, email_message.encode('utf-8'))
        return True
    except Exception as e:
        print('Error sending email:', e)
        return False


@app.post('/api/messages', response_model=schemas.MessageOut)
async def create_message(msg: schemas.MessageCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_msg = models.Message(name=msg.name, email=msg.email, subject=msg.subject, message=msg.message)
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)

    # send email in background
    background_tasks.add_task(send_email_notification, msg.name, msg.email, msg.subject, msg.message)

    return db_msg


@app.get('/api/messages', response_model=list[schemas.MessageOut])
async def list_messages(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    """Get all messages - requires admin authentication."""
    msgs = db.query(models.Message).order_by(models.Message.timestamp.desc()).all()
    
    # Add reply count to each message
    result = []
    for msg in msgs:
        msg_dict = {
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "subject": msg.subject,
            "message": msg.message,
            "timestamp": msg.timestamp,
            "delivered": msg.delivered,
            "is_read": msg.is_read,
            "read_at": msg.read_at,
            "reply_count": len(msg.replies)
        }
        result.append(msg_dict)
    
    return result


@app.patch('/api/messages/{message_id}/mark-read')
async def mark_message_read(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    """Mark a message as read."""
    message = db.query(models.Message).filter(models.Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    if not message.is_read:
        message.is_read = True
        message.read_by_admin_id = current_user.id
        message.read_at = datetime.utcnow()
        db.commit()
    
    return {"message": "Message marked as read"}


# ============ Authentication Endpoints ============

@app.post('/api/auth/register', response_model=schemas.UserOut)
async def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    """Register a new user (admin only)."""
    # Check if username already exists
    if auth.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Check if email already exists
    if auth.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Validate password length
    if len(user.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    
    if len(user.password) > 72:
        raise HTTPException(status_code=400, detail="Password cannot be longer than 72 characters")
    
    # New users are admins by default and don't need to change password
    db_user = auth.create_user(db, user, is_admin=True, must_change_password=False)
    return db_user


@app.post('/api/auth/login', response_model=schemas.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login with username and password to get JWT token."""
    user = auth.authenticate_user(db, form_data.username, form_data.password)
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
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "must_change_password": user.must_change_password
    }


@app.get('/api/auth/me', response_model=schemas.UserOut)
async def get_me(current_user: models.User = Depends(auth.get_current_user)):
    """Get current logged-in user information."""
    return current_user


@app.post('/api/auth/logout')
async def logout():
    """Logout endpoint (client should delete token)."""
    return {"message": "Successfully logged out"}


@app.post('/api/auth/change-password')
async def change_password(
    password_data: schemas.PasswordChange,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Change user password."""
    # Verify current password
    if not auth.verify_password(password_data.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Verify new passwords match
    if password_data.new_password != password_data.confirm_password:
        raise HTTPException(status_code=400, detail="New passwords do not match")
    
    # Validate new password length
    if len(password_data.new_password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    
    if len(password_data.new_password) > 72:
        raise HTTPException(status_code=400, detail="Password cannot be longer than 72 characters")
    
    # Get the user from the current database session
    db_user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update password
    db_user.hashed_password = auth.get_password_hash(password_data.new_password)
    db_user.must_change_password = False
    db.commit()
    db.refresh(db_user)  # Refresh to ensure changes are reflected
    
    return {"message": "Password changed successfully", "must_change_password": db_user.must_change_password}


@app.get('/api/auth/users', response_model=list[schemas.UserOut])
async def list_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    """Get all users (admin only)."""
    users = db.query(models.User).order_by(models.User.created_at.desc()).all()
    return users


@app.patch('/api/auth/users/{user_id}/toggle-active')
async def toggle_user_active(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    """Toggle user active status (admin only)."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Prevent deactivating yourself
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot deactivate your own account")
    
    # Prevent deactivating super admins (arij and imen)
    if user.is_super_admin:
        raise HTTPException(status_code=403, detail="Cannot deactivate super admin accounts")
    
    user.is_active = not user.is_active
    db.commit()
    db.refresh(user)
    return {"message": f"User {'activated' if user.is_active else 'deactivated'} successfully", "user": user}


# ============ Password Reset Endpoints ============

@app.post('/api/auth/forgot-password')
async def forgot_password(
    request: schemas.ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    """Request password reset token."""
    import secrets
    
    user = auth.get_user_by_email(db, request.email)
    if not user:
        # Don't reveal if email exists or not for security
        return {"message": "If the email exists, a reset link will be sent"}
    
    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
    db.commit()
    
    # TODO: Send email with reset link
    # For now, return the token (in production, this should be emailed)
    reset_link = f"http://localhost:5174/reset-password?token={reset_token}"
    print(f"Password reset link for {user.email}: {reset_link}")
    
    return {"message": "If the email exists, a reset link will be sent", "reset_link": reset_link}


@app.post('/api/auth/reset-password')
async def reset_password(
    request: schemas.ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    """Reset password using token."""
    user = db.query(models.User).filter(models.User.reset_token == request.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Check if token is expired
    if user.reset_token_expiry < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Verify passwords match
    if request.new_password != request.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    # Validate password length
    if len(request.new_password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    
    if len(request.new_password) > 72:
        raise HTTPException(status_code=400, detail="Password cannot be longer than 72 characters")
    
    # Update password and clear reset token
    user.hashed_password = auth.get_password_hash(request.new_password)
    user.reset_token = None
    user.reset_token_expiry = None
    user.must_change_password = False
    db.commit()
    
    return {"message": "Password reset successfully"}


# ============ Message Reply Endpoints ============

@app.post('/api/messages/{message_id}/reply', response_model=schemas.MessageReplyWithAdmin)
async def send_message_reply(
    message_id: int,
    reply_data: schemas.MessageReplyCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    """Reply to a contact message (admin only)."""
    # Verify message exists
    message = db.query(models.Message).filter(models.Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Create reply record
    reply = models.MessageReply(
        message_id=message_id,
        admin_id=current_user.id,
        reply_from_email=reply_data.reply_from_email,
        reply_subject=reply_data.reply_subject,
        reply_body=reply_data.reply_body
    )
    db.add(reply)
    
    # TODO: Send actual email here
    # For now, just save the reply to database
    print(f"Reply to {message.email} from {reply_data.reply_from_email}")
    print(f"Subject: {reply_data.reply_subject}")
    print(f"Body: {reply_data.reply_body}")
    
    db.commit()
    db.refresh(reply)
    
    # Add admin username to response
    return schemas.MessageReplyWithAdmin(
        id=reply.id,
        message_id=reply.message_id,
        admin_id=reply.admin_id,
        admin_username=current_user.username,
        reply_from_email=reply.reply_from_email,
        reply_subject=reply.reply_subject,
        reply_body=reply.reply_body,
        sent_at=reply.sent_at
    )


@app.get('/api/messages/{message_id}/replies', response_model=list[schemas.MessageReplyWithAdmin])
async def get_message_replies(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    """Get all replies for a message (admin only)."""
    replies = db.query(models.MessageReply).filter(
        models.MessageReply.message_id == message_id
    ).all()
    
    # Add admin usernames
    result = []
    for reply in replies:
        admin = db.query(models.User).filter(models.User.id == reply.admin_id).first()
        result.append(schemas.MessageReplyWithAdmin(
            id=reply.id,
            message_id=reply.message_id,
            admin_id=reply.admin_id,
            admin_username=admin.username if admin else "Unknown",
            reply_from_email=reply.reply_from_email,
            reply_subject=reply.reply_subject,
            reply_body=reply.reply_body,
            sent_at=reply.sent_at
        ))
    
    return result


@app.get('/api/health')
async def health():
    return {'status': 'ok'}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)
