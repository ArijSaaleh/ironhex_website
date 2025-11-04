"""Messages API Router"""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models import Message, MessageReply, User
from app.schemas import MessageCreate, MessageOut, MessageReplyCreate, MessageReplyWithAdmin
from app.services.auth import get_current_admin_user
from app.services.email import email_service

router = APIRouter(prefix="/api/messages", tags=["messages"])


@router.post("", response_model=MessageOut)
async def create_message(
    msg: MessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Create a new contact message"""
    db_msg = Message(
        name=msg.name,
        email=msg.email,
        subject=msg.subject,
        message=msg.message
    )
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    
    # Send notification email in background
    background_tasks.add_task(
        email_service.send_contact_notification,
        msg.name,
        msg.email,
        msg.subject,
        msg.message
    )
    
    return db_msg


@router.get("", response_model=list[MessageOut])
async def list_messages(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all messages (admin only)"""
    msgs = db.query(Message).order_by(Message.timestamp.desc()).all()
    
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


@router.patch("/{message_id}/mark-read")
async def mark_message_read(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Mark a message as read"""
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    if not message.is_read:
        message.is_read = True
        message.read_by_admin_id = current_user.id
        message.read_at = datetime.utcnow()
        db.commit()
    
    return {"message": "Message marked as read"}


@router.post("/{message_id}/reply", response_model=MessageReplyWithAdmin)
async def send_message_reply(
    message_id: int,
    reply_data: MessageReplyCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Reply to a contact message (admin only)"""
    # Verify message exists
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Create reply record
    reply = MessageReply(
        message_id=message_id,
        admin_id=current_user.id,
        reply_from_email=reply_data.reply_from_email,
        reply_subject=reply_data.reply_subject,
        reply_body=reply_data.reply_body
    )
    db.add(reply)
    db.commit()
    db.refresh(reply)
    
    # Send email in background
    background_tasks.add_task(
        email_service.send_reply_email,
        to_email=message.email,
        to_name=message.name,
        from_email=reply_data.reply_from_email,
        subject=reply_data.reply_subject,
        body=reply_data.reply_body
    )
    
    # Mark message as read if not already
    if not message.is_read:
        message.is_read = True
        message.read_by_admin_id = current_user.id
        message.read_at = datetime.utcnow()
        db.commit()
    
    # Return reply with admin username
    return MessageReplyWithAdmin(
        id=reply.id,
        message_id=reply.message_id,
        admin_id=reply.admin_id,
        admin_username=current_user.username,
        reply_from_email=reply.reply_from_email,
        reply_subject=reply.reply_subject,
        reply_body=reply.reply_body,
        sent_at=reply.sent_at
    )


@router.get("/{message_id}/replies", response_model=list[MessageReplyWithAdmin])
async def get_message_replies(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all replies for a message (admin only)"""
    replies = db.query(MessageReply).filter(
        MessageReply.message_id == message_id
    ).all()
    
    # Add admin usernames
    result = []
    for reply in replies:
        admin = db.query(User).filter(User.id == reply.admin_id).first()
        result.append(MessageReplyWithAdmin(
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
