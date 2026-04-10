# Hosting Setup Guide - Sylhetly News

## ✅ Completed Setup

### 1. File Upload System
- **Backend Upload Route**: `/api/upload/image` and `/api/upload/images`
- **Upload Directory**: `backend/uploads/` (created)
- **File Size Limit**: 10MB per file
- **Allowed Types**: jpeg, jpg, png, gif, webp
- **Static Files**: Served at `/uploads/` endpoint

### 2. Environment Files
- **Admin Panel**: `.env.local` created with Firebase config
- **Backend**: Uses `.env` file (create from `.env.example`)
- **Frontend**: Uses `.env` file (create from `.env.example`)

### 3. Server Status
- ✅ Frontend: Running on default port (usually 5173)
- ✅ Backend: Running on port 5000
- ✅ Admin Panel: Running on default Next.js port (usually 3000)

## 📁 File Upload Configuration

### Backend Upload Endpoint

**Single Image Upload:**
```bash
POST /api/upload/image
Content-Type: multipart/form-data
Body: { image: <file> }
Response: { success: true, url: "/uploads/filename.jpg", filename: "filename.jpg" }
```

**Multiple Images Upload:**
```bash
POST /api/upload/images
Content-Type: multipart/form-data
Body: { images: [<file1>, <file2>, ...] }
Response: { success: true, files: [{ url: "...", filename: "..." }] }
```

### Upload Directory Structure
```
backend/
  └── uploads/
      ├── .gitkeep
      └── [uploaded files]
```

## 🚀 Hosting Deployment

### Frontend (Vite + React)
1. Build: `npm run build`
2. Output: `frontend/dist/`
3. Deploy to: Vercel, Netlify, or any static host
4. Environment: Set `VITE_API_URL` and `VITE_FRONTEND_URL`

### Backend (Express + TypeScript)
1. Build: `npm run build`
2. Output: `backend/dist/`
3. Deploy to: Railway, Render, Heroku, or VPS
4. Environment Variables:
   - `PORT` (default: 5000)
   - `FRONTEND_URL`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

**Important for Backend Hosting:**
- Ensure `uploads/` directory is writable
- Set up persistent storage for uploads (or use cloud storage)
- Configure CORS with production frontend URL

### Admin Panel (Next.js)
1. Build: `npm run build`
2. Output: `admin/.next/` and `admin/out/` (if static export)
3. Deploy to: Vercel (recommended) or any Node.js host
4. Environment Variables (`.env.local`):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
   - `NEXT_PUBLIC_ADMIN_EMAILS`

## 🔧 File Upload for Hosting

### Option 1: Local Storage (Current Setup)
- Files stored in `backend/uploads/`
- Served via `/uploads/` static route
- **Note**: Files will be lost on server restart unless using persistent storage

### Option 2: Cloud Storage (Recommended for Production)
Consider migrating to:
- **Firebase Storage** (already configured in admin panel)
- **AWS S3**
- **Cloudinary**
- **DigitalOcean Spaces**

### Migration to Cloud Storage Example (Firebase)
The admin panel already uses Firebase Storage. You can update the backend upload route to use Firebase Storage instead of local storage.

## 📝 Environment Variables Checklist

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_FRONTEND_URL=https://your-frontend-domain.com
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password
```

### Admin (.env.local)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com
```

## 🔒 Security Notes

1. **Upload Directory**: Ensure proper permissions (read/write for server, read for public)
2. **File Validation**: Already implemented (type and size checks)
3. **CORS**: Configured in backend for frontend domain
4. **Environment Variables**: Never commit `.env` files to git

## ✅ Current Status

- ✅ File upload system configured
- ✅ Upload directory created
- ✅ Backend upload routes added
- ✅ Static file serving configured
- ✅ All three servers running
- ✅ Admin panel fully functional with Firebase
- ✅ Environment files created

## 🎯 Next Steps for Production

1. Set up cloud storage for file uploads (recommended)
2. Configure production environment variables
3. Set up SSL certificates
4. Configure CDN for static assets
5. Set up monitoring and logging
6. Configure backup strategy for uploads
