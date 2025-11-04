# 🔄 Server Migration Guide

## What Changed?

The server has been completely reorganized for better maintainability, debugging, and scalability. Here's what's new:

## 📦 New Structure Overview

### Before (Flat Structure)
```
server/
├── main.py          # 700+ lines of mixed code
├── auth.py          # Authentication
├── database.py      # Database
├── models.py        # All models
├── schemas.py       # All schemas
└── messages.db
```

### After (Modular Structure)
```
server/
├── app/
│   ├── config/         # ⚙️ Configuration
│   │   ├── settings.py    # Environment & settings
│   │   └── database.py    # Database setup
│   ├── models/         # 🗄️ Database Models
│   │   ├── message.py     # Message & Reply models
│   │   ├── user.py        # User model
│   │   └── demo.py        # Demo request model
│   ├── schemas/        # ✅ Validation Schemas
│   │   ├── message.py     # Message schemas
│   │   ├── user.py        # User schemas
│   │   └── demo.py        # Demo schemas
│   ├── routers/        # 🛣️ API Routes
│   │   ├── messages.py    # Message endpoints
│   │   ├── auth.py        # Auth endpoints
│   │   └── demo.py        # Demo endpoints
│   ├── services/       # 💼 Business Logic
│   │   ├── auth.py        # Authentication service
│   │   └── email.py       # SendGrid email service
│   └── utils/          # 🔧 Utilities
├── main.py             # Clean entry point (~70 lines)
└── messages.db
```

## ✨ Key Improvements

### 1. **Separation of Concerns**
- **Config**: All settings and database configuration in one place
- **Models**: Database models separated by domain
- **Schemas**: Validation schemas organized by feature
- **Routers**: API routes grouped by functionality
- **Services**: Business logic and external integrations

### 2. **SendGrid Email Integration**
- ❌ **Removed**: Manual SMTP with `smtplib`
- ✅ **Added**: Professional SendGrid integration
- Beautiful HTML email templates
- Better error handling
- Demo mode when API key not configured

### 3. **Better Imports**
```python
# Old way
import models
import schemas
import auth
from database import get_db

# New way
from app.models import Message, User
from app.schemas import MessageCreate
from app.services.auth import get_current_admin_user
from app.config.database import get_db
```

### 4. **Cleaner Main File**
- Old `main.py`: 700+ lines
- New `main.py`: ~70 lines
- All logic moved to appropriate modules

## 🚀 What Still Works

### ✅ All Existing Functionality Preserved
- Contact message management
- User authentication (JWT)
- Message replies
- Demo requests
- Password reset
- User management

### ✅ Same API Endpoints
All existing endpoints work exactly the same:
- `POST /api/messages`
- `GET /api/messages`
- `POST /api/auth/login`
- etc.

### ✅ Same Database Schema
No database changes - your existing `messages.db` works as-is!

## 📧 SendGrid Setup (New!)

### Why SendGrid?

**Old SMTP Issues:**
- Manual HTML formatting
- Complex SMTP configuration
- Limited deliverability tracking
- Generic-looking emails
- Hard to maintain templates

**New SendGrid Benefits:**
- Professional email templates
- Better deliverability
- Automatic unsubscribe handling
- Email analytics
- Branded, beautiful emails
- Easy to use API

### Quick Setup

1. **Sign up** at [sendgrid.com](https://sendgrid.com)
2. **Get API Key**: Settings → API Keys → Create
3. **Add to .env**:
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=noreply@ironhex-tech.com
   SENDGRID_FROM_NAME=IRONHEX
   EMAIL_TO=contact@ironhex-tech.com
   ```

### Demo Mode

If SendGrid is not configured, emails won't be sent but the API will still work:

```
📧 [DEMO MODE] Would send notification about message from John Doe <john@example.com>
   Subject: Website Inquiry
```

## 🔄 Migration Steps

### For Development

1. **Pull the new code** ✅ (Already done!)
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Update .env** file with SendGrid credentials
4. **Test the server**:
   ```bash
   uvicorn main:app --reload
   ```

### For Production

1. **Backup database**: `cp messages.db messages.db.backup`
2. **Update code**: Pull from repository
3. **Install dependencies**: `pip install -r requirements.txt`
4. **Update environment**: Add SendGrid variables to `.env`
5. **Test locally**: Verify everything works
6. **Deploy**: Restart server with new code

## 📝 Code Examples

### Sending Emails (New Way)

```python
from app.services.email import email_service

# In your route handler
await email_service.send_contact_notification(
    name="John Doe",
    email="john@example.com",
    subject="Question about IoT",
    message="I'm interested in your IoT solutions..."
)
```

### Authentication (Same Way)

```python
from app.services.auth import get_current_admin_user
from app.models import User

@router.get("/protected")
async def protected_route(
    current_user: User = Depends(get_current_admin_user)
):
    return {"user": current_user.username}
```

### Database Access (Same Way)

```python
from app.config.database import get_db
from app.models import Message

@router.get("/messages")
async def get_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).all()
    return messages
```

## 🎯 Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Code Organization** | Single large files | Modular, organized folders |
| **Maintainability** | Hard to find code | Easy to locate & update |
| **Testing** | Difficult | Each module testable |
| **Email Service** | Manual SMTP | Professional SendGrid |
| **Debugging** | Mixed concerns | Clear separation |
| **Scalability** | Limited | Easy to extend |
| **Code Reuse** | Duplicated logic | Shared services |
| **Onboarding** | Confusing | Clear structure |

## 🔍 Debugging Tips

### Find Code Quickly

- **API endpoint?** → Look in `app/routers/`
- **Database model?** → Look in `app/models/`
- **Validation?** → Look in `app/schemas/`
- **Business logic?** → Look in `app/services/`
- **Configuration?** → Look in `app/config/`

### Common Issues

**Import Error: "No module named 'app'"**
- ✅ Make sure you're in the `server/` directory
- ✅ Check that `app/` folder exists with `__init__.py`

**SendGrid Not Sending Emails**
- ✅ Check `SENDGRID_API_KEY` in `.env`
- ✅ Verify API key has "Mail Send" permissions
- ✅ Look for "DEMO MODE" in logs

**Database Not Found**
- ✅ Run `from app.config.database import init_db; init_db()`
- ✅ Check that `messages.db` exists in `server/` folder

## 📚 Learning Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **SendGrid Python**: https://github.com/sendgrid/sendgrid-python
- **SQLAlchemy**: https://docs.sqlalchemy.org
- **Clean Architecture**: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

## ❓ FAQ

**Q: Do I need to change my frontend code?**
A: No! All API endpoints remain the same.

**Q: Will my existing database work?**
A: Yes! No schema changes, `messages.db` works as-is.

**Q: Is SendGrid required?**
A: No, the API works without it (demo mode), but emails won't be sent.

**Q: Can I still use SMTP?**
A: Yes, but SendGrid is recommended. Old SMTP code is removed but can be re-added if needed.

**Q: What happened to the old files?**
A: They're still there (`auth.py`, `database.py`, etc.) but deprecated. New code is in `app/` folder.

**Q: Should I delete old files?**
A: Not immediately. Keep them as reference during transition, delete later when confident.

## 🎉 Ready to Go!

Your server is now:
- ✅ Better organized
- ✅ Easier to maintain
- ✅ Professional emails
- ✅ Scalable architecture
- ✅ Ready for production

Start the server and enjoy the clean new structure!

```bash
uvicorn main:app --reload
```

Visit http://localhost:8000/docs to see your API! 🚀
