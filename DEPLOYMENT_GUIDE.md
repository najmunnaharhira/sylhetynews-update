# 🚀 Sylhetly News - Deployment Guide

## 📦 Package Information

This hosting package contains:
- **Frontend** (React + Vite)
- **Backend** (Express.js + TypeScript)
- **Admin Panel** (Next.js)

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database (or MongoDB Atlas)
- Firebase project configured
- Domain/server ready for hosting

### Step 1: Extract Files
```bash
unzip sylhetlynews-hosting-*.zip
cd sylhetlynews-hosting-*
```

### Step 2: Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run build
```

**Frontend .env variables:**
```env
VITE_API_URL=https://yourdomain.com/api
VITE_FRONTEND_URL=https://yourdomain.com
```

### Step 3: Setup Backend
```bash
cd ../backend
npm install
cp .env.example .env
# Edit .env with your configuration
mkdir uploads
chmod 755 uploads  # Linux/Mac
npm start
```

**Backend .env variables:**
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourSecurePassword123!
```

### Step 4: Setup Admin Panel
```bash
cd ../admin
npm install
cp .env.example .env.local
# Edit .env.local with your Firebase configuration
npm run build
npm start
```

**Admin .env.local variables:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com
```

## 🌐 Hosting Options

### Option 1: Vercel (Frontend + Admin)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Option 2: Netlify (Frontend)
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Option 3: VPS/Server (Full Stack)
1. Install Node.js and PM2
2. Setup Nginx reverse proxy
3. Configure SSL with Let's Encrypt
4. Use PM2 to run backend: `pm2 start npm --name "backend" -- start`

### Option 4: Railway/Render (Backend)
1. Connect repository
2. Set environment variables
3. Deploy backend service

## 📁 Directory Structure

```
sylhetlynews/
├── frontend/
│   ├── dist/          # Build output (deploy this)
│   ├── .env           # Environment variables
│   └── package.json
├── backend/
│   ├── uploads/       # File uploads (create with write permissions)
│   ├── .env           # Environment variables
│   └── package.json
└── admin/
    ├── .next/         # Build output
    ├── .env.local     # Environment variables
    └── package.json
```

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong MongoDB credentials
- [ ] Enable HTTPS/SSL
- [ ] Set proper CORS origins
- [ ] Configure firewall rules
- [ ] Set upload directory permissions
- [ ] Use environment variables (never commit .env)
- [ ] Enable rate limiting on API
- [ ] Regular backups of database

## 🛠️ Production Commands

### Frontend
```bash
npm run build          # Build for production
npm run preview        # Preview production build
```

### Backend
```bash
npm start              # Production mode
npm run dev            # Development mode
```

### Admin
```bash
npm run build          # Build for production
npm start              # Production server
npm run dev            # Development server
```

## 📊 Monitoring

- Monitor server logs
- Check database connections
- Monitor file upload directory size
- Set up error tracking (Sentry, etc.)
- Monitor API response times

## 🔄 Updates

1. Pull latest code from GitHub
2. Run `npm install` in each directory
3. Rebuild applications
4. Restart services

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify PORT is available
- Check .env file exists and is correct

### Frontend build fails
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Verify .env variables

### Admin panel errors
- Verify Firebase configuration
- Check admin email in NEXT_PUBLIC_ADMIN_EMAILS
- Ensure Firebase project is active

### File uploads not working
- Check uploads directory exists
- Verify write permissions
- Check file size limits (10MB default)

## 📞 Support

For detailed instructions, see:
- `HOSTING_SETUP.md` - Complete hosting guide
- `PRODUCTION_DEPLOYMENT.md` - Production deployment
- `SETUP_CHECKLIST.md` - Setup checklist

---

**Package Version:** Latest
**Generated:** $(Get-Date -Format 'yyyy-MM-dd')
**GitHub:** https://github.com/najmunnaharhira/sylhetlynews
