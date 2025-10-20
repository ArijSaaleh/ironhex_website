import os
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import smtplib
import ssl
from dotenv import load_dotenv
from database import init_db

load_dotenv()

import models, schemas
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

ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', 'change-me')
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
async def list_messages(request: Request, db: Session = Depends(get_db)):
    # Expect Authorization: Bearer <token>
    auth = request.headers.get('authorization')
    if not auth or not auth.lower().startswith('bearer '):
        raise HTTPException(status_code=401, detail='Unauthorized')
    token = auth.split(' ', 1)[1]
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail='Forbidden')

    msgs = db.query(models.Message).order_by(models.Message.timestamp.desc()).all()
    return msgs


@app.get('/api/health')
async def health():
    return {'status': 'ok'}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('server.main:app', host='0.0.0.0', port=8000, reload=True)
