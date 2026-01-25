# PowerShell script to create separate hosting zip files for Frontend, Backend, and Admin
$ErrorActionPreference = "Stop"

$rootDir = Get-Location
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'

Write-Host "Creating separate hosting zip files..." -ForegroundColor Green
Write-Host ""

# ============================================
# 1. FRONTEND ZIP
# ============================================
Write-Host "Creating Frontend hosting zip..." -ForegroundColor Yellow
$frontendZipName = "frontend-hosting-$timestamp.zip"
$frontendTempDir = Join-Path $env:TEMP "sylhetlynews-frontend-hosting"

if (Test-Path $frontendTempDir) {
    Remove-Item -Path $frontendTempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $frontendTempDir | Out-Null

# Copy frontend files (excluding node_modules, dist, .env, build artifacts)
Write-Host "  - Copying frontend files..." -ForegroundColor Cyan
Get-ChildItem -Path "frontend" -Exclude "node_modules", "dist", ".env", ".next", ".vite", "build" | 
    Copy-Item -Destination $frontendTempDir -Recurse -Force

# Create frontend deployment README
$frontendReadme = @"
# Sylhetly News - Frontend Hosting Package

## 📦 Package Contents

This package contains the React frontend application for Sylhetly News.

## 🚀 Quick Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration:
# - VITE_API_URL: Your backend API URL
# - VITE_FRONTEND_URL: Your frontend URL
# - Firebase configuration
\`\`\`

### 3. Build for Production
\`\`\`bash
npm run build
\`\`\`

### 4. Deploy
The build output will be in the \`dist/\` directory. Deploy this directory to your hosting provider.

## 📝 Required Environment Variables (.env)

\`\`\`env
VITE_API_URL=https://your-backend-domain.com/api
VITE_FRONTEND_URL=https://your-frontend-domain.com
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
\`\`\`

## 🌐 Hosting Options

- **Vercel**: Connect your GitHub repo or upload the \`dist/\` folder
- **Netlify**: Drag and drop the \`dist/\` folder
- **Firebase Hosting**: Use \`firebase deploy\`
- **Traditional Hosting**: Upload \`dist/\` contents to your web server

## 📁 Important Files

- \`dist/\`: Production build output (deploy this)
- \`public/\`: Static assets
- \`src/\`: Source code
- \`.env.example\`: Environment variable template

## 🔒 Security Notes

1. Never commit .env files
2. Use HTTPS in production
3. Configure CORS properly on backend
4. Set proper environment variables

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

$frontendReadme | Out-File -FilePath (Join-Path $frontendTempDir "DEPLOYMENT_README.md") -Encoding UTF8

# Create frontend zip
Compress-Archive -Path "$frontendTempDir\*" -DestinationPath $frontendZipName -Force
Remove-Item -Path $frontendTempDir -Recurse -Force
$frontendSize = [math]::Round((Get-Item $frontendZipName).Length / 1MB, 2)
Write-Host "  ✅ Frontend zip created: $frontendZipName ($frontendSize MB)" -ForegroundColor Green
Write-Host ""

# ============================================
# 2. BACKEND ZIP
# ============================================
Write-Host "Creating Backend hosting zip..." -ForegroundColor Yellow
$backendZipName = "backend-hosting-$timestamp.zip"
$backendTempDir = Join-Path $env:TEMP "sylhetlynews-backend-hosting"

if (Test-Path $backendTempDir) {
    Remove-Item -Path $backendTempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $backendTempDir | Out-Null

# Copy backend files (excluding node_modules, .env, uploads content)
Write-Host "  - Copying backend files..." -ForegroundColor Cyan
Get-ChildItem -Path "backend" -Exclude "node_modules", ".env", "uploads" | 
    Copy-Item -Destination $backendTempDir -Recurse -Force

# Create uploads directory with .gitkeep
$uploadsDest = Join-Path $backendTempDir "uploads"
New-Item -ItemType Directory -Path $uploadsDest | Out-Null
if (Test-Path "backend/uploads/.gitkeep") {
    Copy-Item -Path "backend/uploads/.gitkeep" -Destination $uploadsDest -Force
}

# Create backend deployment README
$backendReadme = @"
# Sylhetly News - Backend Hosting Package

## 📦 Package Contents

This package contains the Express.js backend API server for Sylhetly News.

## 🚀 Quick Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration:
# - PORT: Server port (default: 5000)
# - MONGODB_URI: MongoDB connection string
# - FRONTEND_URL: Frontend URL
# - ADMIN_EMAIL: Admin email
# - ADMIN_PASSWORD: Admin password
# - Firebase configuration
\`\`\`

### 3. Create Uploads Directory
\`\`\`bash
mkdir uploads
chmod 755 uploads  # Linux/Mac
# Or set proper permissions on Windows
\`\`\`

### 4. Start Server
\`\`\`bash
# Development
npm run dev

# Production
npm start
\`\`\`

## 📝 Required Environment Variables (.env)

\`\`\`env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourSecurePassword123!

# Firebase Configuration
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
\`\`\`

## 🌐 Hosting Options

- **Heroku**: Connect GitHub repo or use Heroku CLI
- **Railway**: Connect GitHub repo
- **DigitalOcean App Platform**: Connect GitHub repo
- **AWS EC2**: Deploy manually
- **VPS**: Use PM2 for process management

## 📁 Important Files

- \`src/server.js\`: Main server file
- \`src/routes/\`: API routes
- \`src/controllers/\`: Request handlers
- \`src/models/\`: Database models
- \`uploads/\`: File upload directory (create and set permissions)

## 🔒 Security Notes

1. Never commit .env files
2. Use strong admin passwords
3. Enable HTTPS
4. Configure CORS properly
5. Set proper file permissions for uploads directory
6. Use environment variables for all secrets

## 🛠️ Process Management (Production)

### Using PM2
\`\`\`bash
npm install -g pm2
pm2 start src/server.js --name sylhetlynews-backend
pm2 save
pm2 startup
\`\`\`

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

$backendReadme | Out-File -FilePath (Join-Path $backendTempDir "DEPLOYMENT_README.md") -Encoding UTF8

# Create backend zip
Compress-Archive -Path "$backendTempDir\*" -DestinationPath $backendZipName -Force
Remove-Item -Path $backendTempDir -Recurse -Force
$backendSize = [math]::Round((Get-Item $backendZipName).Length / 1MB, 2)
Write-Host "  ✅ Backend zip created: $backendZipName ($backendSize MB)" -ForegroundColor Green
Write-Host ""

# ============================================
# 3. ADMIN ZIP
# ============================================
Write-Host "Creating Admin hosting zip..." -ForegroundColor Yellow
$adminZipName = "admin-hosting-$timestamp.zip"
$adminTempDir = Join-Path $env:TEMP "sylhetlynews-admin-hosting"

if (Test-Path $adminTempDir) {
    Remove-Item -Path $adminTempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $adminTempDir | Out-Null

# Copy admin files (excluding node_modules, .next, .env.local, out, build artifacts)
Write-Host "  - Copying admin files..." -ForegroundColor Cyan
Get-ChildItem -Path "admin" -Exclude "node_modules", ".next", ".env.local", ".env", "out", ".vite", "build" | 
    Copy-Item -Destination $adminTempDir -Recurse -Force

# Create admin deployment README
$adminReadme = @"
# Sylhetly News - Admin Panel Hosting Package

## 📦 Package Contents

This package contains the Next.js admin panel for Sylhetly News.

## 🚀 Quick Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your configuration:
# - Firebase configuration
# - NEXT_PUBLIC_ADMIN_EMAILS: Comma-separated admin emails
\`\`\`

### 3. Build for Production
\`\`\`bash
npm run build
\`\`\`

### 4. Start Server
\`\`\`bash
npm start
\`\`\`

## 📝 Required Environment Variables (.env.local)

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com,admin2@example.com
\`\`\`

## 🌐 Hosting Options

- **Vercel**: Connect GitHub repo (recommended for Next.js)
- **Netlify**: Connect GitHub repo
- **Railway**: Connect GitHub repo
- **Traditional Hosting**: Build and deploy \`.next/\` or \`out/\` directory

## 📁 Important Files

- \`.next/\`: Production build output (Next.js)
- \`out/\`: Static export output (if using static export)
- \`public/\`: Static assets
- \`src/\`: Source code
- \`.env.example\`: Environment variable template

## 🔒 Security Notes

1. Never commit .env.local files
2. Use HTTPS in production
3. Configure admin emails properly
4. Set proper Firebase security rules
5. Use environment variables for all secrets

## 🛠️ Static Export (Optional)

If you want to export as static site:
\`\`\`bash
# In next.config.ts, add:
output: 'export'

# Then build:
npm run build
# Deploy the \`out/\` directory
\`\`\`

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

$adminReadme | Out-File -FilePath (Join-Path $adminTempDir "DEPLOYMENT_README.md") -Encoding UTF8

# Create admin zip
Compress-Archive -Path "$adminTempDir\*" -DestinationPath $adminZipName -Force
Remove-Item -Path $adminTempDir -Recurse -Force
$adminSize = [math]::Round((Get-Item $adminZipName).Length / 1MB, 2)
Write-Host "  ✅ Admin zip created: $adminZipName ($adminSize MB)" -ForegroundColor Green
Write-Host ""

# ============================================
# SUMMARY
# ============================================
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ All hosting zip files created!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Files created:" -ForegroundColor Cyan
Write-Host "  1. $frontendZipName ($frontendSize MB)" -ForegroundColor White
Write-Host "  2. $backendZipName ($backendSize MB)" -ForegroundColor White
Write-Host "  3. $adminZipName ($adminSize MB)" -ForegroundColor White
Write-Host ""
Write-Host "Each zip contains:" -ForegroundColor Yellow
Write-Host "  - All necessary source files" -ForegroundColor White
Write-Host "  - DEPLOYMENT_README.md with setup instructions" -ForegroundColor White
Write-Host "  - .env.example files for configuration" -ForegroundColor White
Write-Host ""
Write-Host "Ready for separate hosting! 🚀" -ForegroundColor Green
