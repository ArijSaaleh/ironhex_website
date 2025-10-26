# IronHex Website

Modern, secure website for IronHex with JWT authentication, admin dashboard, and contact form management.

## 🏗️ Project Structure

```
ironhexwebsite/
├── client/                 # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar, Footer, etc.)
│   │   ├── pages/         # Page components (Home, Admin, Services, etc.)
│   │   └── assets/        # Static assets (images, videos)
│   └── public/            # Public assets
│
├── server/                # FastAPI backend
│   ├── main.py           # Main API application
│   ├── auth.py           # JWT authentication & password handling
│   ├── models.py         # SQLAlchemy database models
│   ├── schemas.py        # Pydantic validation schemas
│   ├── database.py       # Database configuration
│   ├── init_admins.py    # Initialize default admin users
│   └── requirements.txt  # Python dependencies
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/ArijSaaleh/ironhex_website.git
cd ironhexwebsite
```

### 2. Backend Setup

```bash
cd server

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and set your SECRET_KEY (important for production!)
# SECRET_KEY=your-super-secret-key-change-this

# Initialize database and create default admin users
python init_admins.py

# Start the server
python main.py
# Or use: uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: `http://localhost:8000`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 🔐 Default Admin Credentials

After running `init_admins.py`, two default admin accounts are created:

**Admin 1:**
- Username: `arij`
- Email: `arij@ironhex.com`
- Password: `IronHex2025!`

**Admin 2:**
- Username: `imen`
- Email: `imen@ironhex.com`
- Password: `IronHex2025!`

⚠️ **Important:** Both admins will be forced to change their password on first login.

## 🎯 Key Features

### Frontend
- **Modern UI** - Built with React, Vite, and Tailwind CSS
- **Responsive Design** - Mobile-first approach
- **Services Pages** - Cybersecurity and IoT solutions
- **Contact Form** - Submit inquiries to admins
- **Admin Dashboard** - View messages and manage users
- **User Management** - Create and manage admin accounts

### Backend
- **JWT Authentication** - Secure token-based auth
- **Password Security** - Bcrypt hashing, forced password changes
- **User Management** - Admin-only user creation and management
- **Contact Form API** - Store and retrieve messages
- **CORS Configured** - Frontend-backend communication
- **Email Notifications** - Optional SMTP integration for contact form

## 📡 API Endpoints

### Public Endpoints
- `POST /api/messages` - Submit contact form
- `POST /api/auth/login` - Login with username/password
- `GET /api/health` - Health check

### Protected Endpoints (Requires JWT Token)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Change password

### Admin Only Endpoints
- `GET /api/messages` - List all contact messages
- `POST /api/auth/register` - Create new admin user
- `GET /api/auth/users` - List all users
- `PATCH /api/auth/users/{id}/toggle-active` - Activate/deactivate user

## 🔧 Configuration

### Backend (.env)
```env
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=60
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
EMAIL_TO=admin@ironhex.com
```

### Frontend (Vite Proxy)
The frontend automatically proxies `/api/*` requests to `http://localhost:8000` during development.

## 📝 Development

### Running Both Servers
You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
.venv\Scripts\activate  # Windows
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd client
npm run build
# Output in client/dist/
```

**Backend:**
```bash
cd server
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🗄️ Database

- **SQLite** database (`messages.db`) stores all data
- **Auto-migration** on startup (creates tables if they don't exist)
- **Reset database**: Delete `messages.db` and run `python init_admins.py`

### Database Models

**User:**
- `id`, `username`, `email`, `hashed_password`
- `is_admin`, `is_active`, `must_change_password`
- `created_at`, `last_login`

**Message:**
- `id`, `name`, `email`, `subject`, `message`
- `timestamp`, `delivered`

## 🔒 Security Features

1. **JWT Tokens** - Secure, stateless authentication
2. **Password Hashing** - Bcrypt with salt
3. **Password Validation** - 8-72 character requirement
4. **Forced Password Change** - For default admin accounts
5. **CORS Protection** - Configured origins only
6. **Admin-Only Routes** - Role-based access control
7. **Token Expiry** - 60-minute default expiry

## 🐛 Troubleshooting

### Backend not starting?
- Check Python version: `python --version` (need 3.11+)
- Activate virtual environment
- Install dependencies: `pip install -r requirements.txt`

### Frontend not loading?
- Check Node version: `node --version` (need 18+)
- Install dependencies: `npm install`
- Check if backend is running on port 8000

### Database errors?
- Delete `server/messages.db`
- Run `python init_admins.py`

### Authentication errors?
- Clear browser localStorage
- Check `.env` has `SECRET_KEY` set
- Restart backend server

## 📦 Dependencies

### Backend
- FastAPI - Web framework
- SQLAlchemy - ORM
- Pydantic - Data validation
- python-jose - JWT handling
- passlib[bcrypt] - Password hashing
- uvicorn - ASGI server

### Frontend
- React 18
- React Router DOM
- Vite
- Tailwind CSS
- PostCSS & Autoprefixer

## 📄 License

Copyright © 2024 IronHex. All rights reserved.

## 👥 Team

- **Arij** - Admin
- **Imen** - Admin

## 🔗 Links

- [GitHub Repository](https://github.com/ArijSaaleh/ironhex_website)
- Admin Dashboard: `http://localhost:5173/admin`
- User Management: `http://localhost:5173/admin/users`


This repo contains a React client (client/) and a FastAPI server (server/).

See `client/README.md` and `server/README.md` for per-app instructions.

Deployment notes
----------------

Recommended deployment:
- Client: Deploy the `client/dist` static site to Vercel (connected to this repo). The included `vercel.json` will build the client.
- Server: Deploy the FastAPI app to Render, Railway or Fly. Keep your SMTP credentials and `ADMIN_TOKEN` as environment variables.

GitHub Actions
--------------
There is a simple workflow at `.github/workflows/ci.yml` that builds the client on push to `main` and uploads the `dist` artifact. You can extend the workflow to deploy automatically.

Security note
-------------
The `/privatemessages` React page fetches messages using a token you provide. Keep `ADMIN_TOKEN` secret — do not check it into the repository.
