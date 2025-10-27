# 🛡️ IRONHEX - Cybersecurity & IoT Solutions Platform# IronHex Website



Modern, multilingual website for IRONHEX with JWT authentication, admin dashboard, dark mode, and comprehensive internationalization (i18n) support.Modern, secure website for IronHex with JWT authentication, admin dashboard, and contact form management.



![IRONHEX](https://img.shields.io/badge/IRONHEX-Cybersecurity%20%26%20IoT-green)## 🏗️ Project Structure

![React](https://img.shields.io/badge/React-18-blue)

![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)```

![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)ironhexwebsite/

├── client/                 # React frontend (Vite + Tailwind CSS)

---│   ├── src/

│   │   ├── components/    # Reusable components (Navbar, Footer, etc.)

## 📋 Table of Contents│   │   ├── pages/         # Page components (Home, Admin, Services, etc.)

- [Overview](#-overview)│   │   └── assets/        # Static assets (images, videos)

- [Features](#-features)│   └── public/            # Public assets

- [Tech Stack](#-tech-stack)│

- [Project Structure](#-project-structure)├── server/                # FastAPI backend

- [Quick Start](#-quick-start)│   ├── main.py           # Main API application

- [Configuration](#-configuration)│   ├── auth.py           # JWT authentication & password handling

- [Internationalization](#-internationalization)│   ├── models.py         # SQLAlchemy database models

- [Deployment](#-deployment)│   ├── schemas.py        # Pydantic validation schemas

- [Security](#-security)│   ├── database.py       # Database configuration

│   ├── init_admins.py    # Initialize default admin users

---│   └── requirements.txt  # Python dependencies

│

## 🌟 Overview└── README.md



IRONHEX is a full-stack web platform showcasing cybersecurity and IoT services with:

- **Multi-language support** (English, French, Arabic with RTL)## 🚀 Quick Start

- **Dark/Light theme** toggle with persistence

- **Admin dashboard** for message and user management### Prerequisites

- **JWT-based authentication** with password reset functionality- **Node.js** 18+ and npm

- **Responsive design** optimized for all devices- **Python** 3.11+

- **Git**



### 1. Clone the Repository

## ✨ Features

```bash
    git clone https://github.com/ArijSaaleh/ironhex_website.git
```

### 🎨 Frontend Featurescd ironhexwebsite

- ✅ **Multilingual Support** - English, French, Arabic (with automatic RTL)```

- ✅ **Dark Mode** - System-aware theme with manual toggle

- ✅ **Responsive Design** - Mobile-first, works on all screen sizes### 2. Backend Setup

- ✅ **Service Pages** - Cybersecurity, IoT, and Software Solutions

- ✅ **FAQ Section** - Comprehensive Q&A with categories```bash

- ✅ **Tunisian Regulations** - Legal compliance informationcd server

- ✅ **Contact Form** - Multi-language contact submissions

- ✅ **Admin Dashboard** - Message viewing, reply system, user management# Create virtual environment

- ✅ **Password Reset** - Email-based password recoverypython -m venv .venv


### 🔐 Backend Features# Activate virtual environment

- ✅ **JWT Authentication** - Secure token-based auth# Windows:

- ✅ **Password Security** - Bcrypt hashing, forced password changes.venv\Scripts\activate

- ✅ **User Management** - Admin-only user creation and deactivation# Linux/Mac:

- ✅ **Message System** - Store, retrieve, and reply to contact formssource .venv/bin/activate

- ✅ **Email Integration** - SMTP support for notifications

- ✅ **CORS Protection** - Configured for secure cross-origin requests# Install dependencies

- ✅ **SQLite Database** - Lightweight, zero-config persistencepip install -r requirements.txt



## Create .env file (copy from .env.example)

cp .env.example .env

## 🛠️ Tech Stack

# Edit .env and set your SECRET_KEY (important for production!)

### Frontend# SECRET_KEY=your-super-secret-key-change-this

- **React 18** + **TypeScript** - UI framework with type safety

- **Vite** - Fast build tool# Initialize database and create default admin users

- **Tailwind CSS** - Utility-first stylingpython init_admins.py

- **React Router DOM** - Client-side routing

- **Context API** - State management (Theme, Language)# Start the server

- **Shadcn/ui** - Accessible component librarypython main.py

# Or use: uvicorn main:app --reload --host 0.0.0.0 --port 8000

### Backend
```

- **FastAPI** - Modern Python web framework

- **SQLAlchemy** - ORM for database operationsThe backend API will be available at: `http://localhost:8000`

- **Python-JOSE** - JWT token handling

- **Passlib[bcrypt]** - Password hashing### 3. Frontend Setup

- **SQLite** - Database

```bash

---cd client



## 📁 Project Structure# Install dependencies

npm install

```

ironhexwebsite/
# Start development server

├── client/                     # React Frontendnpm run dev

│   ├── src/```

│   │   ├── components/         # Reusable components

│   │   │   ├── Navbar.tsxThe frontend will be available at: `http://localhost:5173`

│   │   │   ├── Footer.tsx

│   │   │   ├── ThemeToggle.tsx## 🔐 Default Admin Credentials

│   │   │   ├── LanguageSelector.tsx

│   │   │   └── ui/             # Shadcn componentsAfter running `init_admins.py`, two default admin accounts are created:

│   │   ├── contexts/           # React Context

│   │   │   ├── ThemeContext.tsx**Admin 1:**

│   │   │   └── LanguageContext.tsx (250+ translations)- Username: `arij`

│   │   ├── pages/              # Page components- Email: `arij@ironhex.com`

│   │   │   ├── Home.tsx- Password: `IronHex2025!`

│   │   │   ├── About.tsx

│   │   │   ├── Services.jsx**Admin 2:**

│   │   │   ├── Cybersecurity.tsx- Username: `imen`

│   │   │   ├── IoT.tsx- Email: `imen@ironhex.com`

│   │   │   ├── SoftwareSolutions.tsx- Password: `IronHex2025!`

│   │   │   ├── FAQ.tsx

│   │   │   ├── TunisianRegulations.tsx⚠️ **Important:** Both admins will be forced to change their password on first login.

│   │   │   └── Admin.tsx

│   │   └── App.tsx## 🎯 Key Features

│   └── package.json

│
### Frontend

├── server/                     # FastAPI Backend- **Modern UI** - Built with React, Vite, and Tailwind CSS

│   ├── main.py                 # Main application- **Responsive Design** - Mobile-first approach

│   ├── auth.py                 # Authentication logic- **Services Pages** - Cybersecurity and IoT solutions

│   ├── models.py               # Database models- **Contact Form** - Submit inquiries to admins

│   ├── schemas.py              # Pydantic schemas- **Admin Dashboard** - View messages and manage users

│   ├── database.py             # DB configuration- **User Management** - Create and manage admin accounts

│   └── requirements.txt

│
### Backend

├── .gitignore- **JWT Authentication** - Secure token-based auth

├── vercel.json                 # Vercel deployment config- **Password Security** - Bcrypt hashing, forced password changes

└── README.md- **User Management** - Admin-only user creation and management

```
- **Contact Form API** - Store and retrieve messages

- **CORS Configured** - Frontend-backend communication

---- **Email Notifications** - Optional SMTP integration for contact form


```
## 🚀 Quick Start## 📡 API Endpoints



### Prerequisites### Public Endpoints

- **Node.js** 18+ and npm- `POST /api/messages` - Submit contact form

- **Python** 3.11+- `POST /api/auth/login` - Login with username/password

- **Git**- `GET /api/health` - Health check



### 1️⃣ Clone the Repository### Protected Endpoints (Requires JWT Token)

```bash- `GET /api/auth/me` - Get current user info

git clone https://github.com/ArijSaaleh/ironhex_website.git- `POST /api/auth/logout` - Logout

cd ironhexwebsite- `POST /api/auth/change-password` - Change password



### Admin Only Endpoints

### 2️⃣ Backend Setup- `GET /api/messages` - List all contact messages

- `POST /api/auth/register` - Create new admin user

```bash- `GET /api/auth/users` - List all users

cd server- `PATCH /api/auth/users/{id}/toggle-active` - Activate/deactivate user



# Create virtual environment## 🔧 Configuration

python -m venv .venv

### Backend (.env)

# Activate virtual environment```env

# Windows PowerShell:SECRET_KEY=your-secret-key-here

.venv\Scripts\Activate.ps1ACCESS_TOKEN_EXPIRE_MINUTES=60

SMTP_HOST=smtp.gmail.com

# Install dependenciesSMTP_PORT=587

pip install -r requirements.txtSMTP_USER=your@email.com

SMTP_PASS=your-app-password

# Create .env fileEMAIL_TO=admin@ironhex.com

cp .env.example .env```



# Edit .env and set your SECRET_KEY### Frontend (Vite Proxy)

notepad .envThe frontend automatically proxies `/api/*` requests to `http://localhost:8000` during development.



# Initialize database## 📝 Development

python

>>> from database import engine, Base### Running Both Servers

>>> Base.metadata.create_all(bind=engine)You'll need two terminal windows:

>>> exit()

**Terminal 1 - Backend:**

# Start the server
```bash

python main.pycd server

```.venv\Scripts\activate  # Windows

python main.py

**Backend API:** `http://localhost:8000`  ```

**API Docs:** `http://localhost:8000/docs`

**Terminal 2 - Frontend:**

### 3️⃣ Frontend Setup```bash

cd client

```bashnpm run dev

cd client```



# Install dependencies### Building for Production

npm install

**Frontend:**

# Start development server```bash

npm run devcd client

```npm run build

# Output in client/dist/

**Frontend:** `http://localhost:5173````



---**Backend:**

```bash

## ⚙️ Configurationcd server

uvicorn main:app --host 0.0.0.0 --port 8000

### Backend (.env)```

```env

# Required## 🗄️ Database

SECRET_KEY=your-super-secret-key-change-this

ACCESS_TOKEN_EXPIRE_MINUTES=60- **SQLite** database (`messages.db`) stores all data

- **Auto-migration** on startup (creates tables if they dont exist)

# Optional - Email- **Reset database**: Delete `messages.db` and run `python init_admins.py`

SMTP_HOST=smtp.gmail.com

SMTP_PORT=587### Database Models

SMTP_USER=your-email@gmail.com

SMTP_PASS=your-app-password**User:**

EMAIL_TO=admin@ironhex.com- `id`, `username`, `email`, `hashed_password`

```- `is_admin`, `is_active`, `must_change_password`

- `created_at`, `last_login`

---

**Message:**

## 🌍 Internationalization- `id`, `name`, `email`, `subject`, `message`

- `timestamp`, `delivered`
```
### Supported Languages

- 🇬🇧 **English** (en) - Default## 🔒 Security Features

- 🇫🇷 **French** (fr)

- 🇹🇳 **Arabic** (ar) - With RTL support1. **JWT Tokens** - Secure, stateless authentication

2. **Password Hashing** - Bcrypt with salt

### Features3. **Password Validation** - 8-72 character requirement

- ✅ **Automatic RTL** - Arabic switches to right-to-left layout4. **Forced Password Change** - For default admin accounts

- ✅ **localStorage Persistence** - User's language choice is saved5. **CORS Protection** - Configured origins only

- ✅ **250+ Translation Keys** - Complete coverage6. **Admin-Only Routes** - Role-based access control

- ✅ **Context-Aware** - Translations for all pages and components7. **Token Expiry** - 60-minute default expiry



### Usage in Components## 🐛 Troubleshooting

```typescript

import { useLanguage } from '../contexts/LanguageContext';### Backend not starting?

- Check Python version: `python --version` (need 3.11+)

function MyComponent() {- Activate virtual environment

  const { t } = useLanguage();- Install dependencies: `pip install -r requirements.txt`

  return <h1>{t('nav.home')}</h1>;

} ```
### Frontend not loading?

```- Check Node version: `node --version` (need 18+)

- Install dependencies: `npm install`

---- Check if backend is running on port 8000


```
## 🎨 Theme System### Database errors?

- Delete `server/messages.db`

### Features- Run `python init_admins.py`

- **Light Mode** - Default clean design

- **Dark Mode** - Eye-friendly dark theme### Authentication errors?

- **System Preference** - Auto-detects OS theme- Clear browser localStorage

- **Manual Toggle** - Sun/Moon icon in navbar- Check `.env` has `SECRET_KEY` set

- **Persistence** - Choice saved in localStorage- Restart backend server


## 📦 Dependencies



## 📦 Deployment

### Backend

- FastAPI - Web framework

### Frontend - Vercel- SQLAlchemy - ORM

```bash- Pydantic - Data validation
```
# Automatic deployment via vercel.json- python-jose - JWT handling

# Just push to main branch- passlib[bcrypt] - Password hashing

- uvicorn - ASGI server

# Manual

cd client### Frontend

npm run build- React 18

vercel --prod- React Router DOM

```- Vite
```
- Tailwind CSS

### Backend - Render/Railway- PostCSS & Autoprefixer

Set environment variables:

```env## 📄 License

SECRET_KEY=your-production-secret

SMTP_HOST=smtp.gmail.comCopyright © 2024 IronHex. All rights reserved.

SMTP_USER=your-email

SMTP_PASS=your-password## 👥 Team

```

- **Arij** - Admin

Start command:- **Imen** - Admin

```bash

uvicorn main:app --host 0.0.0.0 --port $PORT## 🔗 Links

```

- [GitHub Repository](https://github.com/ArijSaaleh/ironhex_website)

---- Admin Dashboard: `http://localhost:5173/admin`

- User Management: `http://localhost:5173/admin/users`

## 🔒 Security



### Implemented MeasuresThis repo contains a React client (client/) and a FastAPI server (server/).

1. ✅ JWT Tokens (stateless auth)

2. ✅ Password Hashing (Bcrypt, 12 rounds)See `client/README.md` and `server/README.md` for per-app instructions.

3. ✅ CORS Protection

4. ✅ SQL Injection Protection (SQLAlchemy ORM)Deployment notes

5. ✅ XSS Protection (input sanitization)----------------

6. ✅ Token Expiry (60-minute default)

7. ✅ Admin-Only Routes (role-based access)Recommended deployment:

- Client: Deploy the `client/dist` static site to Vercel (connected to this repo). The included `vercel.json` will build the client.

---- Server: Deploy the FastAPI app to Render, Railway or Fly. Keep your SMTP credentials and `ADMIN_TOKEN` as environment variables.



## 🐛 TroubleshootingGitHub Actions

--------------

### Backend IssuesThere is a simple workflow at `.github/workflows/ci.yml` that builds the client on push to `main` and uploads the `dist` artifact. You can extend the workflow to deploy automatically.



**ModuleNotFoundError:**Security note

```bash-------------

cd serverThe `/privatemessages` React page fetches messages using a token you provide. Keep `ADMIN_TOKEN` secret — do not check it into the repository.

.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Database errors:**
```bash
rm messages.db
python
>>> from database import engine, Base
>>> Base.metadata.create_all(bind=engine)
```

### Frontend Issues

**Module not found:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

**Theme not persisting:**
- Open DevTools > Application > Local Storage > Clear All

---

## 📊 API Endpoints

### Public
- `POST /api/messages` - Submit contact form
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/health` - Health check

### Protected (JWT Required)
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password
- `GET /api/messages` - List messages (admin)
- `POST /api/messages/{id}/reply` - Reply to message (admin)

### Admin Only
- `POST /api/auth/register` - Create admin user
- `GET /api/auth/users` - List users
- `PATCH /api/auth/users/{id}/toggle-active` - Toggle user status

---

## 📝 Development Scripts

### Client
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Server
```bash
python main.py                    # Start server
uvicorn main:app --reload         # Start with auto-reload
```

---

## 📄 License

Copyright © 2025 IRONHEX. All rights reserved.

---

## 👥 Team

**Co-Founders:**
- **Imen Chihi** - CISO (Chief Information Security Officer)
- **Arij Saleh** - CTO (Chief Technology Officer)

---

## 🔗 Links

- **GitHub**: [ArijSaaleh/ironhex_website](https://github.com/ArijSaaleh/ironhex_website)
- **API Docs**: `http://localhost:8000/docs`

---

## 📧 Contact

**Email**: contact@ironhex.com  
**Website**: [www.ironhex.com](https://www.ironhex.com)

---

**Built with ❤️ by the IRONHEX Team**
