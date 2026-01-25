# PowerShell script to create hosting zip file
$ErrorActionPreference = "Stop"

$rootDir = Get-Location
$zipName = "sylhetlynews-hosting-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip"
$tempDir = Join-Path $env:TEMP "sylhetlynews-hosting"

Write-Host "Creating hosting zip file..." -ForegroundColor Green

# Clean up temp directory if exists
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Copying files..." -ForegroundColor Yellow

# Copy frontend (excluding node_modules, dist, .env)
Write-Host "  - Frontend..." -ForegroundColor Cyan
$frontendDest = Join-Path $tempDir "frontend"
New-Item -ItemType Directory -Path $frontendDest | Out-Null
Get-ChildItem -Path "frontend" -Exclude "node_modules", "dist", ".env", ".next" | 
    Copy-Item -Destination $frontendDest -Recurse -Force

# Copy backend (excluding node_modules, .env, uploads content)
Write-Host "  - Backend..." -ForegroundColor Cyan
$backendDest = Join-Path $tempDir "backend"
New-Item -ItemType Directory -Path $backendDest | Out-Null
Get-ChildItem -Path "backend" -Exclude "node_modules", ".env", "uploads" | 
    Copy-Item -Destination $backendDest -Recurse -Force
# Create uploads directory with .gitkeep
$uploadsDest = Join-Path $backendDest "uploads"
New-Item -ItemType Directory -Path $uploadsDest | Out-Null
Copy-Item -Path "backend/uploads/.gitkeep" -Destination $uploadsDest -Force

# Copy admin (excluding node_modules, .next, .env.local, out)
Write-Host "  - Admin..." -ForegroundColor Cyan
$adminDest = Join-Path $tempDir "admin"
New-Item -ItemType Directory -Path $adminDest | Out-Null
Get-ChildItem -Path "admin" -Exclude "node_modules", ".next", ".env.local", ".env", "out" | 
    Copy-Item -Destination $adminDest -Recurse -Force

# Copy important documentation files
Write-Host "  - Documentation..." -ForegroundColor Cyan
$docs = @(
    "README.md",
    "HOSTING_SETUP.md",
    "PRODUCTION_DEPLOYMENT.md",
    "SETUP_CHECKLIST.md"
)
foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Copy-Item -Path $doc -Destination $tempDir -Force
    }
}

# Create deployment README
$deployReadme = @"
# Sylhetly News - Hosting Package

## 📦 Package Contents

- **frontend/**: React frontend application
- **backend/**: Express.js backend server
- **admin/**: Next.js admin panel

## 🚀 Quick Setup

### 1. Frontend Setup
\`\`\`bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Firebase and API URLs
npm run build
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, Firebase config, and admin credentials
npm start
\`\`\`

### 3. Admin Panel Setup
\`\`\`bash
cd admin
npm install
cp .env.example .env.local
# Edit .env.local with your Firebase config and admin emails
npm run build
npm start
\`\`\`

## 📝 Environment Variables

### Frontend (.env)
- VITE_API_URL: Backend API URL
- VITE_FRONTEND_URL: Frontend URL
- Firebase configuration (see .env.example)

### Backend (.env)
- PORT: Server port (default: 5000)
- MONGODB_URI: MongoDB connection string
- FRONTEND_URL: Frontend URL
- ADMIN_EMAIL: Admin email
- ADMIN_PASSWORD: Admin password
- Firebase configuration

### Admin (.env.local)
- NEXT_PUBLIC_FIREBASE_API_KEY: Firebase API key
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: Firebase auth domain
- NEXT_PUBLIC_FIREBASE_PROJECT_ID: Firebase project ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: Firebase storage bucket
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: Firebase messaging sender ID
- NEXT_PUBLIC_FIREBASE_APP_ID: Firebase app ID
- NEXT_PUBLIC_ADMIN_EMAILS: Comma-separated admin emails

## 📁 Important Directories

- **backend/uploads/**: File upload directory (create and set permissions)
- **frontend/dist/**: Frontend build output
- **admin/.next/**: Admin build output (or use `out/` for static export)

## 🔒 Security Notes

1. Never commit .env files
2. Set proper file permissions for uploads directory
3. Use strong admin passwords
4. Enable HTTPS in production
5. Configure CORS properly

## 📚 Documentation

See HOSTING_SETUP.md for detailed hosting instructions.

## 🆘 Support

For issues, check:
- HOSTING_SETUP.md
- PRODUCTION_DEPLOYMENT.md
- SETUP_CHECKLIST.md

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

$deployReadme | Out-File -FilePath (Join-Path $tempDir "DEPLOYMENT_README.md") -Encoding UTF8

# Create zip file
Write-Host "Creating zip file..." -ForegroundColor Yellow
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipName -Force

# Clean up temp directory
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "`n✅ Hosting zip created: $zipName" -ForegroundColor Green
Write-Host "   Size: $((Get-Item $zipName).Length / 1MB) MB" -ForegroundColor Cyan
