# 🛡️ IRONHEX - Cybersecurity & IoT Solutions

Modern, multilingual website with JWT authentication, admin dashboard, and dark mode.

![React](https://img.shields.io/badge/React-18-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.119-green) ![Docker](https://img.shields.io/badge/Docker-Compose-blue)

---

## 🏗️ Project Structure

```
ironhexwebsite/
├── client/                 # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── assets/        # Static assets
│   ├── Dockerfile         # Frontend Docker image
│   └── nginx.conf         # Nginx configuration
│
├── server/                # FastAPI backend
│   ├── app/
│   │   ├── routers/       # API endpoints
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── middleware/    # Security & rate limiting
│   ├── Dockerfile         # Backend Docker image
│   └── requirements.txt   # Python dependencies
│
├── deployment/            # Deployment scripts
│   ├── docker-deploy.sh   # Main deployment script
│   ├── docker-setup-vps.sh # Initial VPS setup
│   ├── docker-ssl-setup.sh # SSL configuration
│   ├── docker-backup.sh   # Backup automation
│   └── docker-monitor.sh  # Health monitoring
│
├── .github/workflows/     # CI/CD automation
│   └── deploy.yml         # Auto-deploy on push
│
└── docker-compose.yml     # Container orchestration
```

---

## ⚡ Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### Local Development

```bash
# Clone repository
git clone https://github.com/ArijSaaleh/ironhex_website.git
cd ironhex_website

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f
```

**Access:**
- Frontend: http://localhost
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🚀 Deployment (VPS)

### Initial Setup

```bash
# Download and run setup script
curl -O https://raw.githubusercontent.com/ArijSaaleh/ironhex_website/main/deployment/docker-setup-vps.sh
chmod +x docker-setup-vps.sh
sudo ./docker-setup-vps.sh
```

### SSL Configuration (Optional)

```bash
cd /var/www/ironhex
sudo ./deployment/docker-ssl-setup.sh your-domain.com
```

### Automated Deployment

Every `git push origin main` automatically deploys via GitHub Actions:
1. SSH into VPS
2. Pull latest code
3. Rebuild containers
4. Zero-downtime deployment

**Setup GitHub Secrets:**
- `VPS_HOST` - Your VPS IP
- `VPS_USERNAME` - SSH username
- `VPS_SSH_KEY` - Private SSH key
- `VPS_PORT` - SSH port (22)

---

## 🔧 Configuration

### Environment Variables

Create `.env` files:

**Root `.env`:**
```env
DEBUG=False
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://51.91.8.230,http://ironhex-tech.com,https://ironhex-tech.com
SENDGRID_API_KEY=your-sendgrid-key
VITE_API_URL=http://51.91.8.230:8000
```

**Server `.env`:**
```env
DATABASE_URL=sqlite:///./messages.db
ADMIN_EMAIL=admin@ironhex-tech.com
ADMIN_PASSWORD=secure-password
```

---

## 🌐 Features

- ✅ **Multilingual** - English, French, Arabic support
- ✅ **Dark Mode** - System-aware theme switching
- ✅ **JWT Auth** - Secure admin authentication
- ✅ **Admin Dashboard** - User & message management
- ✅ **Contact Forms** - Demo requests & privacy messages
- ✅ **Rate Limiting** - DDoS protection
- ✅ **Security Headers** - CSP, HSTS, X-Frame-Options
- ✅ **Auto-Deploy** - GitHub Actions CI/CD
- ✅ **Docker** - Containerized deployment
- ✅ **Health Checks** - Monitoring & auto-recovery

---

## 🛡️ Security

- JWT token authentication (HS256)
- Bcrypt password hashing
- Rate limiting (5 req/min per IP)
- CORS protection
- Content Security Policy
- SQL injection protection (SQLAlchemy ORM)
- XSS sanitization

---

## 📦 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router
- i18next (internationalization)

**Backend:**
- FastAPI
- SQLAlchemy ORM
- Pydantic validation
- JWT tokens
- SendGrid email
- SQLite database

**DevOps:**
- Docker Compose
- GitHub Actions
- Nginx
- Ubuntu VPS

---

## 🔍 Monitoring

```bash
# View container status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Run health check
./deployment/docker-monitor.sh

# Create backup
./deployment/docker-backup.sh
```

---

## 📄 License

Proprietary - © 2025 IRONHEX

---

## 👨‍💻 Author

**IRONHEX Team**  
Email: arij.saleh@ironhex-tech.com  
Website: http://ironhex-tech.com
