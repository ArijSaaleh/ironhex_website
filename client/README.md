# IronHex Frontend Client

Modern React frontend built with Vite and Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

**Note:** Backend must be running at `http://localhost:8000` for API calls to work.

## 🏗️ Build for Production

```bash
npm run build
```

Output directory: `dist/`

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx     # Navigation with dropdown
│   │   ├── Footer.jsx     # Footer with links
│   │   ├── ContactForm.jsx # Contact form
│   │   ├── ChangePasswordModal.jsx # Password change modal
│   │   └── Typewriter.jsx # Typewriter effect
│   │
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── About.jsx      # About page
│   │   ├── Services.jsx   # Services overview
│   │   ├── Cybersecurity.jsx # Cybersecurity services
│   │   ├── IoT.jsx        # IoT solutions
│   │   ├── Admin.jsx      # Admin login & dashboard
│   │   ├── UserManagement.jsx # User management
│   │   └── PrivacyMessages.jsx # Privacy policy
│   │
│   ├── assets/            # Static assets
│   │   ├── images/
│   │   └── videos/
│   │
│   ├── App.jsx            # Main app with routes
│   ├── main.jsx           # App entry point
│   └── style.css          # Global styles (Tailwind)
│
├── public/                # Public assets (logo, hero image)
├── index.html            # HTML template
├── vite.config.js        # Vite configuration (with proxy)
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

## 🔗 Routes

### Public Routes
- `/` - Home page
- `/about` - About IronHex
- `/services` - Services overview
- `/services/cybersecurity` - Cybersecurity solutions
- `/services/iot` - IoT solutions
- `/privatemessages` - Privacy policy

### Protected Routes
- `/admin` - Admin login & dashboard
- `/admin/users` - User management (admin only)

## 🔧 Configuration

### Vite Proxy
API requests to `/api/*` are proxied to `http://localhost:8000`:

```js
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
```

### Tailwind CSS
Custom colors defined in `tailwind.config.js`:

```js
colors: {
  primary: '#1e40af',      // Blue
  'primary-dark': '#1e3a8a',
  secondary: '#10b981',    // Green
  accent: '#f59e0b'        // Amber
}
```

## 📦 Key Components

### Navbar
- Responsive navigation with mobile menu
- Services dropdown with hover effect
- Active route highlighting

### ContactForm
- Form validation
- API integration with backend
- Success/error feedback

### Admin Dashboard
- JWT authentication
- Message list view
- User management link
- Logout functionality

### ChangePasswordModal
- Forced password change for new admins
- Password validation
- Cannot dismiss if required

## 🔐 Authentication Flow

1. User logs in at `/admin`
2. Backend returns JWT token
3. Token stored in localStorage
4. If `must_change_password` is true, show password modal
5. After password change, access dashboard
6. Token sent with all API requests

## 🐛 Troubleshooting

**Port 5173 already in use:**
```bash
# Kill the process or change port in vite.config.js
```

**API calls failing:**
- Ensure backend is running at `http://localhost:8000`
- Check browser console for CORS errors
- Verify Vite proxy configuration

**Styles not loading:**
```bash
npm install
# Make sure Tailwind dependencies are installed
```

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🚢 Deployment

The frontend can be deployed to:
- **Vercel** (recommended for Vite apps)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

Build command: `npm run build`
Output directory: `dist`

**Important:** Update backend API URL for production in the frontend code or use environment variables.

