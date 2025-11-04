# IRONHEX Messages API v2.0# IronHex Backend Server



Modern, organized FastAPI backend for the IRONHEX website with clean architecture and SendGrid integration.FastAPI backend with JWT authentication, user management, and contact form API.



## 🎯 Features## 🚀 Quick Start



- 📨 **Contact Message Management** - Handle inquiries from website visitors### 1. Setup Virtual Environment

- 🔐 **JWT Authentication** - Secure admin access with token-based auth```bash

- 👥 **User Management** - Admin user creation and managementpython -m venv .venv

- 📧 **SendGrid Integration** - Professional email service with beautiful templates.venv\Scripts\activate  # Windows

- 🎯 **Demo Requests** - Track and manage product demo requestssource .venv/bin/activate  # Linux/Mac

- 🗄️ **SQLite Database** - Lightweight, file-based database```

- 🚀 **FastAPI** - High-performance API with automatic OpenAPI docs

- 🏗️ **Clean Architecture** - Organized, modular codebase### 2. Install Dependencies

```bash

## 📁 New Project Structurepip install -r requirements.txt

```

```

server/### 3. Configure Environment

├── app/                      # Main application package```bash

│   ├── config/              # Configuration modulescp .env.example .env

│   │   ├── database.py      # Database setup & session management# Edit .env and set SECRET_KEY

│   │   └── settings.py      # Application settings from environment```

│   ├── models/              # SQLAlchemy database models

│   │   ├── message.py       # Message & MessageReply models### 4. Initialize Database

│   │   ├── user.py          # User model```bash

│   │   └── demo.py          # DemoRequest modelpython init_admins.py

│   ├── schemas/             # Pydantic validation schemas```

│   │   ├── message.py       # Message schemas

│   │   ├── user.py          # User & auth schemasThis creates:

│   │   └── demo.py          # Demo request schemas- Database with all tables

│   ├── routers/             # API route handlers- Two default admin users (arij & imen)

│   │   ├── messages.py      # Message endpoints- Default password: `IronHex2025!`

│   │   ├── auth.py          # Authentication endpoints

│   │   └── demo.py          # Demo request endpoints### 5. Start Server

│   ├── services/            # Business logic layer```bash

│   │   ├── auth.py          # Authentication servicepython main.py

│   │   └── email.py         # SendGrid email service# Or: uvicorn main:app --reload

│   └── utils/               # Utility functions```

├── main.py                  # Application entry point

├── requirements.txt         # Python dependenciesServer runs at: `http://localhost:8000`

├── .env.example            # Environment variables template

├── .env                    # Your local config (git-ignored)## 📡 API Documentation

├── messages.db             # SQLite database (auto-created)

└── README.md               # This fileOnce running, visit:

```- Swagger UI: `http://localhost:8000/docs`

- ReDoc: `http://localhost:8000/redoc`

## 🚀 Quick Start

## 🔑 Default Credentials

### 1. Install Dependencies

**Username:** arij | **Password:** IronHex2025!

```powershell**Username:** imen | **Password:** IronHex2025!

# Install required Python packages

pip install -r requirements.txt⚠️ Both must change password on first login.

```

## 🔧 Development

### 2. Configure Environment

### Run in Development Mode

```powershell```bash

# Copy the example environment fileuvicorn main:app --reload --host 0.0.0.0 --port 8000

cp .env.example .env```



# Edit .env and add your configuration:### Reset Database

# - SECRET_KEY (generate a secure random key)```bash

# - SENDGRID_API_KEY (get from https://sendgrid.com)rm messages.db

# - Email addressespython init_admins.py

``````



### 3. Run the Server## 📦 Key Files



```powershell- `main.py` - FastAPI application & routes

# Development mode with auto-reload- `auth.py` - JWT authentication & password handling

uvicorn main:app --reload --host 0.0.0.0 --port 8000- `models.py` - Database models (User, Message)

- `schemas.py` - Pydantic validation schemas

# Or use the run script- `database.py` - Database configuration

.\run.ps1- `init_admins.py` - Initialize admin users

```- `requirements.txt` - Python dependencies



### 4. Access the API## 🗄️ Database Schema



- **API Root**: http://localhost:8000### Users Table

- **Interactive Docs**: http://localhost:8000/docs- id (Primary Key)

- **Alternative Docs**: http://localhost:8000/redoc- username (Unique)

- **Health Check**: http://localhost:8000/api/health- email (Unique)

- hashed_password

## 📧 SendGrid Setup- is_admin (Boolean)

- is_active (Boolean)

### Get Your API Key- must_change_password (Boolean)

- created_at (DateTime)

1. Sign up at [SendGrid](https://sendgrid.com)- last_login (DateTime)

2. Navigate to Settings → API Keys

3. Create a new API key with "Mail Send" permissions### Messages Table

4. Copy the API key to your `.env` file- id (Primary Key)

- name

### Configure Email Settings- email

- subject

```env- message

SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx- timestamp (DateTime)

SENDGRID_FROM_EMAIL=noreply@ironhex-tech.com- delivered (Boolean)

SENDGRID_FROM_NAME=IRONHEX

EMAIL_TO=contact@ironhex-tech.com## 🔐 Security Features

```

- JWT token-based authentication

### Email Features- Bcrypt password hashing

- Password length validation (8-72 chars)

- ✅ **Contact Notifications** - Instant admin alerts for new messages- Forced password change for default admins

- ✅ **Reply Emails** - Professional HTML emails to customers- Admin-only routes with role checking

- ✅ **Demo Requests** - Automated notifications for demo inquiries- CORS protection

- ✅ **Beautiful Templates** - Branded, mobile-responsive emails- Token expiry (60 minutes default)

- ✅ **Error Handling** - Graceful fallback if SendGrid is unavailable

## 🐛 Troubleshooting

## 🔐 Authentication

**ModuleNotFoundError:** Make sure virtual environment is activated and dependencies are installed.

### Default Admin Users

**Database locked:** Close any database browsers/tools accessing `messages.db`.

On first run, create admin users via the API or directly in database.

**Port 8000 in use:** Change port in `main.py` or kill the process using port 8000.

### Login


```bash
# Get JWT token
curl -X POST "http://localhost:8000/api/auth/login" \
  -d "username=admin&password=yourpassword"

# Use token in subsequent requests
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/messages"
```

### Token Usage

Include the JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API root information |
| GET | `/api/health` | Health check |
| POST | `/api/messages` | Submit contact form |
| POST | `/api/demo-requests` | Submit demo request |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with token |

### Protected Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | List all messages |
| PATCH | `/api/messages/{id}/mark-read` | Mark message as read |
| POST | `/api/messages/{id}/reply` | Reply to message |
| GET | `/api/messages/{id}/replies` | Get message replies |
| GET | `/api/demo-requests` | List demo requests |
| PATCH | `/api/demo-requests/{id}/mark-read` | Mark demo as read |
| PATCH | `/api/demo-requests/{id}` | Update demo request |
| POST | `/api/auth/register` | Create new admin user |
| GET | `/api/auth/users` | List all users |
| GET | `/api/auth/me` | Get current user info |
| POST | `/api/auth/change-password` | Change password |
| PATCH | `/api/auth/users/{id}/toggle-active` | Activate/deactivate user |

## 🛠️ Development

### Database Management

The database is automatically created on first run. To reset:

```powershell
# Delete the database file
rm messages.db

# Restart the server to recreate tables
uvicorn main:app --reload
```

### Testing Email Service

The email service runs in demo mode if SendGrid is not configured:

```python
# In app/services/email.py
# Logs email details without sending if API key is missing
📧 [DEMO MODE] Would send notification about message from John Doe...
```

### Code Quality

```powershell
# Format code
black app/ main.py

# Type checking
mypy app/

# Linting
pylint app/ main.py
```

## 🔧 Environment Variables

### Required

```env
SECRET_KEY=your-super-secret-jwt-key-here
```

### Optional (SendGrid)

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@ironhex-tech.com
SENDGRID_FROM_NAME=IRONHEX
EMAIL_TO=contact@ironhex-tech.com
```

### Database

```env
DATABASE_URL=sqlite:///./messages.db
```

### Other

```env
ACCESS_TOKEN_EXPIRE_MINUTES=60
VITE_DEV_ORIGIN=http://localhost:5173
DEBUG=True
```

## 📦 Dependencies

- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **python-jose** - JWT token handling
- **passlib + bcrypt** - Password hashing
- **SendGrid** - Email delivery service
- **python-dotenv** - Environment variable management

## 🚀 Deployment

### Production Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `DEBUG=False` in production
- [ ] Configure proper CORS origins (remove `*`)
- [ ] Use PostgreSQL instead of SQLite for production
- [ ] Set up SendGrid with verified sender
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure backup for database

### Example Production Command

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📝 Migration from Old Structure

The old files (`auth.py`, `database.py`, `models.py`, `schemas.py`) are now **deprecated** but kept for reference. The new organized structure is in the `app/` directory:

- `auth.py` → `app/services/auth.py`
- `database.py` → `app/config/database.py`
- `models.py` → `app/models/*.py`
- `schemas.py` → `app/schemas/*.py`
- SMTP emails → `app/services/email.py` (SendGrid)

## 🤝 Contributing

1. Follow the modular structure
2. Add new endpoints in appropriate routers
3. Keep business logic in services
4. Use type hints for better code quality
5. Update this README for new features

## 📄 License

Proprietary - IRONHEX Technology Solutions

---

Made with ❤️ in Tunisia 🇹🇳
