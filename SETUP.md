# 🚀 IronHex Website Setup Guide

Complete setup instructions for the IronHex website project.

## ✅ Setup Checklist

### Prerequisites
- [ ] Node.js 18+ installed
- [ ] Python 3.11+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## 📦 Installation Steps

### 1️⃣ Backend Setup

```powershell
# Navigate to server directory
cd server

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows
# source .venv/bin/activate  # Linux/Mac

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# IMPORTANT: Edit .env and set a strong SECRET_KEY
# SECRET_KEY=your-super-secret-random-string-here

# Initialize database and create default admin users
python init_admins.py

# You should see:
# ✅ Admin user 'arij' created successfully!
# ✅ Admin user 'imen' created successfully!
```

**Default Admin Credentials:**
- Username: `arij` | Password: `IronHex2025!`
- Username: `imen` | Password: `IronHex2025!`

### 2️⃣ Frontend Setup

```powershell
# Navigate to client directory (open new terminal)
cd client

# Install npm dependencies
npm install

# Start development server
npm run dev
```

### 3️⃣ Start Both Servers

**Terminal 1 - Backend:**
```powershell
cd server
.venv\Scripts\activate
python main.py
```
✅ Backend running at: `http://localhost:8000`

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```
✅ Frontend running at: `http://localhost:5173`

## 🧪 Testing the Setup

### 1. Test Frontend
1. Open browser: `http://localhost:5173`
2. Should see IronHex home page
3. Navigate to different pages (About, Services, etc.)

### 2. Test Contact Form
1. Fill out contact form on home page
2. Submit the form
3. Should see success message

### 3. Test Admin Login
1. Go to: `http://localhost:5173/admin`
2. Login with: `arij` / `IronHex2025!`
3. Should prompt to change password
4. After password change, should see dashboard with messages

### 4. Test User Management
1. From admin dashboard, click "Manage Users"
2. Should see list of users (arij, imen)
3. Try creating a new admin user
4. Test activating/deactivating users

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
# Required
SECRET_KEY=your-secret-key-change-this-in-production

# Optional (for contact form email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=admin@ironhex.com

# Token expiry (minutes)
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend Proxy (Already Configured)
- API requests to `/api/*` automatically proxy to `http://localhost:8000`
- Configured in `client/vite.config.js`

## 🗄️ Database

- **Location:** `server/messages.db`
- **Type:** SQLite
- **Tables:** `users`, `messages`

### Reset Database
```powershell
cd server
Remove-Item messages.db
python init_admins.py
```

## 🐛 Common Issues & Solutions

### Issue: "Module not found" errors in backend
**Solution:**
```powershell
cd server
.venv\Scripts\activate
pip install -r requirements.txt
```

### Issue: Frontend can't connect to backend
**Solution:**
1. Check backend is running at `http://localhost:8000`
2. Check browser console for errors
3. Verify Vite proxy in `vite.config.js`

### Issue: Port already in use
**Backend (8000):**
```powershell
# Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Frontend (5173):**
```powershell
# Find and kill process
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue: Authentication errors / 401 Unauthorized
**Solution:**
1. Clear browser localStorage
2. Check `.env` has `SECRET_KEY` set
3. Restart backend server
4. Try logging in again

### Issue: Database locked
**Solution:**
1. Close any database browser tools (DB Browser for SQLite, etc.)
2. Restart backend server

### Issue: Password validation errors
**Remember:**
- Minimum 8 characters
- Maximum 72 characters (bcrypt limitation)
- Must match confirmation

## 📝 Development Workflow

### Making Changes

**Frontend Changes:**
- Edit files in `client/src/`
- Vite hot-reloads automatically
- Check browser console for errors

**Backend Changes:**
- Edit files in `server/`
- Server auto-reloads (if using `--reload` flag)
- Check terminal for errors

### Adding New Admin User

Two methods:

**Method 1: Via Web Interface (Recommended)**
1. Login as admin
2. Go to `/admin/users`
3. Click "Create New User"
4. Fill form and submit

**Method 2: Via Python**
```python
from database import SessionLocal
from auth import get_password_hash
from models import User

db = SessionLocal()
new_user = User(
    username="newadmin",
    email="newadmin@ironhex.com",
    hashed_password=get_password_hash("SecurePassword123"),
    is_admin=True,
    is_active=True,
    must_change_password=False
)
db.add(new_user)
db.commit()
```

## 🚢 Production Deployment

### Backend
1. Set strong `SECRET_KEY` in production `.env`
2. Configure production database (PostgreSQL recommended)
3. Set `ACCESS_TOKEN_EXPIRE_MINUTES` appropriately
4. Configure SMTP for email notifications
5. Deploy to: Heroku, Railway, DigitalOcean, AWS, etc.

### Frontend
1. Update API URL to production backend
2. Build: `npm run build`
3. Deploy `dist/` folder to: Vercel, Netlify, GitHub Pages, etc.

### Environment Variables for Production
```env
# Backend
SECRET_KEY=<strong-random-key>
DATABASE_URL=postgresql://user:pass@host:5432/dbname
FRONTEND_ORIGIN=https://your-domain.com
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Frontend (if using env vars)
VITE_API_URL=https://api.your-domain.com
```

## 📚 Additional Resources

### Documentation
- **FastAPI:** https://fastapi.tiangolo.com/
- **React:** https://react.dev/
- **Vite:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/

### API Documentation
Once backend is running:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Project Structure
```
ironhexwebsite/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── assets/
│   └── public/
│
├── server/          # FastAPI backend
│   ├── main.py
│   ├── auth.py
│   ├── models.py
│   ├── schemas.py
│   └── database.py
│
└── README.md
```

## 🎯 Next Steps

After successful setup:

1. ✅ Change default admin passwords
2. ✅ Configure SMTP for email notifications (optional)
3. ✅ Customize frontend colors/branding in Tailwind config
4. ✅ Add your content (images, text, etc.)
5. ✅ Test all features thoroughly
6. ✅ Prepare for production deployment

## 🆘 Getting Help

If you encounter issues:

1. Check this guide carefully
2. Review error messages in terminal/console
3. Check the README files in `client/` and `server/`
4. Review API documentation at `/docs`
5. Check Python/Node.js versions are correct

## ✨ Features Summary

### Public Features
- Modern responsive design
- Service pages (Cybersecurity, IoT)
- Contact form with validation
- About page

### Admin Features
- Secure JWT authentication
- Dashboard with message list
- User management interface
- Password change system
- Forced password change for new admins

### Security Features
- JWT token authentication
- Bcrypt password hashing
- CORS protection
- Admin-only routes
- Token expiry
- Password validation

---

**Last Updated:** October 2025
**Version:** 1.0.0
