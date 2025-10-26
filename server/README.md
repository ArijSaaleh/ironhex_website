# IronHex Backend Server

FastAPI backend with JWT authentication, user management, and contact form API.

## 🚀 Quick Start

### 1. Setup Virtual Environment
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and set SECRET_KEY
```

### 4. Initialize Database
```bash
python init_admins.py
```

This creates:
- Database with all tables
- Two default admin users (arij & imen)
- Default password: `IronHex2025!`

### 5. Start Server
```bash
python main.py
# Or: uvicorn main:app --reload
```

Server runs at: `http://localhost:8000`

## 📡 API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔑 Default Credentials

**Username:** arij | **Password:** IronHex2025!
**Username:** imen | **Password:** IronHex2025!

⚠️ Both must change password on first login.

## 🔧 Development

### Run in Development Mode
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Reset Database
```bash
rm messages.db
python init_admins.py
```

## 📦 Key Files

- `main.py` - FastAPI application & routes
- `auth.py` - JWT authentication & password handling
- `models.py` - Database models (User, Message)
- `schemas.py` - Pydantic validation schemas
- `database.py` - Database configuration
- `init_admins.py` - Initialize admin users
- `requirements.txt` - Python dependencies

## 🗄️ Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- hashed_password
- is_admin (Boolean)
- is_active (Boolean)
- must_change_password (Boolean)
- created_at (DateTime)
- last_login (DateTime)

### Messages Table
- id (Primary Key)
- name
- email
- subject
- message
- timestamp (DateTime)
- delivered (Boolean)

## 🔐 Security Features

- JWT token-based authentication
- Bcrypt password hashing
- Password length validation (8-72 chars)
- Forced password change for default admins
- Admin-only routes with role checking
- CORS protection
- Token expiry (60 minutes default)

## 🐛 Troubleshooting

**ModuleNotFoundError:** Make sure virtual environment is activated and dependencies are installed.

**Database locked:** Close any database browsers/tools accessing `messages.db`.

**Port 8000 in use:** Change port in `main.py` or kill the process using port 8000.

