"""Demo Requests API Router"""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models import DemoRequest, User
from app.schemas import DemoRequestCreate, DemoRequestOut, DemoRequestUpdate
from app.services.auth import get_current_admin_user
from app.services.email import email_service

router = APIRouter(prefix="/api/demo-requests", tags=["demo-requests"])


@router.post("", response_model=DemoRequestOut)
async def create_demo_request(
    demo_req: DemoRequestCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Create a new demo request"""
    db_demo_request = DemoRequest(**demo_req.dict())
    db.add(db_demo_request)
    db.commit()
    db.refresh(db_demo_request)
    
    # Send notification email in background
    background_tasks.add_task(
        email_service.send_demo_request_notification,
        platform_name=demo_req.platform_name,
        full_name=demo_req.full_name,
        email=demo_req.email,
        phone=demo_req.phone,
        company_name=demo_req.company_name,
        message=demo_req.message
    )
    
    return db_demo_request


@router.get("", response_model=list[DemoRequestOut])
async def get_demo_requests(
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all demo requests (admin only)"""
    demo_requests = db.query(DemoRequest).order_by(DemoRequest.timestamp.desc()).all()
    return demo_requests


@router.patch("/{request_id}/mark-read")
async def mark_demo_request_read(
    request_id: int,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Mark a demo request as read"""
    demo_request = db.query(DemoRequest).filter(DemoRequest.id == request_id).first()
    if not demo_request:
        raise HTTPException(status_code=404, detail='Demo request not found')
    
    demo_request.is_read = True
    demo_request.read_at = datetime.utcnow()
    db.commit()
    return {'status': 'success'}


@router.patch("/{request_id}", response_model=DemoRequestOut)
async def update_demo_request(
    request_id: int,
    update_data: DemoRequestUpdate,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update demo request status, notes, or schedule"""
    demo_request = db.query(DemoRequest).filter(DemoRequest.id == request_id).first()
    if not demo_request:
        raise HTTPException(status_code=404, detail='Demo request not found')
    
    # Update fields if provided
    if update_data.status is not None:
        demo_request.status = update_data.status
    if update_data.demo_scheduled_at is not None:
        demo_request.demo_scheduled_at = update_data.demo_scheduled_at
    if update_data.notes is not None:
        demo_request.notes = update_data.notes
    
    db.commit()
    db.refresh(demo_request)
    return demo_request
