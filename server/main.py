"""
IRONHEX Messages API - Main Application

A modern, organized FastAPI application for handling contact messages,
user authentication, and demo requests with SendGrid email integration.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import init_db, SessionLocal
from app.config.settings import settings
from app.routers import messages, auth, demo
from app.utils import initialize_database
from app.middleware import SecurityHeadersMiddleware

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Secure API for IRONHEX website contact management"
)

# Add security headers middleware
app.add_middleware(SecurityHeadersMiddleware)

@app.on_event("startup")
async def startup_event():
    """Initialize database and create super admins on startup"""
    try:
        print("🚀 Starting application...")
        init_db()
        print("✅ Database initialized")
        
        db = SessionLocal()
        try:
            initialize_database(db)
            print("✅ Super admins checked/created")
        finally:
            db.close()
        print("✅ Application startup complete!")
    except Exception as e:
        print(f"❌ Startup error: {e}")
        import traceback
        traceback.print_exc()

# Configure CORS
origins = [
    settings.VITE_DEV_ORIGIN,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://51.91.8.230",
    "http://51.91.8.230:80",
    "http://51.91.8.230:8000",
    "https://ironhex-tech.com",
    "https://www.ironhex-tech.com",
    "https://ironhex.com",
    "https://www.ironhex.com",
]

# In production, use strict origin checking
if not settings.DEBUG:
    # Production mode - allow specific origins including VPS IP
    production_origins = [
        "http://51.91.8.230",
        "http://51.91.8.230:80",
        "http://51.91.8.230:8000",
        "https://ironhex-tech.com",
        "https://www.ironhex-tech.com",
        "https://ironhex.com",
        "https://www.ironhex.com",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=production_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
        max_age=600,  # Cache preflight requests for 10 minutes
    )
else:
    # Development mode - allow localhost
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include routers
app.include_router(messages.router)
app.include_router(auth.router)
app.include_router(demo.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to IRONHEX Messages API",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "status": "operational"
    }


@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "ok",
        "version": settings.APP_VERSION,
        "service": "IRONHEX Messages API"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
