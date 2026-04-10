# PowerShell script to create cPanel shared hosting-friendly zip files
$ErrorActionPreference = "Stop"

$rootDir = Get-Location
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'

Write-Host "Creating cPanel shared hosting zip files..." -ForegroundColor Green
Write-Host ""

# ============================================
# 1. FRONTEND ZIP (cPanel)
# ============================================
Write-Host "Creating Frontend cPanel hosting zip..." -ForegroundColor Yellow
$frontendZipName = "frontend-cpanel-hosting-$timestamp.zip"
$frontendTempDir = Join-Path $env:TEMP "sylhetlynews-frontend-cpanel"

if (Test-Path $frontendTempDir) {
    Remove-Item -Path $frontendTempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $frontendTempDir | Out-Null

# Copy frontend files (excluding node_modules, dist, .env, build artifacts)
Write-Host "  - Copying frontend files..." -ForegroundColor Cyan
Get-ChildItem -Path "frontend" -Exclude "node_modules", "dist", ".env", ".next", ".vite", "build" | 
    Copy-Item -Destination $frontendTempDir -Recurse -Force

# Create .htaccess for cPanel (if using Apache)
$htaccess = @"
# Enable Rewrite Engine
RewriteEngine On

# Redirect all requests to index.html (for React Router)
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
"@

$htaccess | Out-File -FilePath (Join-Path $frontendTempDir ".htaccess") -Encoding UTF8

# Create cPanel deployment README
$frontendReadme = @"
# Sylhetly News - Frontend cPanel Hosting Package

## 📦 Package Contents

This package contains the React frontend application ready for cPanel shared hosting.

## 🚀 cPanel Deployment Steps

### Option 1: Upload Source and Build on Server (Recommended)

1. **Upload Files**
   - Extract this zip file
   - Upload all files to your cPanel \`public_html\` directory (or subdomain directory)

2. **SSH Access (if available)**
   \`\`\`bash
   cd public_html
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run build
   \`\`\`

3. **Move Build Files**
   - Move contents of \`dist/\` folder to \`public_html/\` root
   - Or configure cPanel to point to \`dist/\` folder

### Option 2: Build Locally and Upload dist/

1. **Build Locally**
   \`\`\`bash
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run build
   \`\`\`

2. **Upload dist/ Folder**
   - Upload all contents of \`dist/\` folder to \`public_html/\` in cPanel
   - The .htaccess file is included for React Router support

## 📝 Environment Variables (.env)

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

## 📁 cPanel File Manager Structure

After deployment, your structure should be:
\`\`\`
public_html/
├── index.html
├── assets/
├── .htaccess
└── ... (other build files)
\`\`\`

## ⚙️ cPanel Configuration

1. **Document Root**: Point to \`public_html\` (or your subdomain directory)
2. **PHP Version**: Not required (static files)
3. **Node.js Version**: Only needed if building on server (check cPanel Node.js Selector)
4. **SSL Certificate**: Enable SSL for HTTPS

## 🔒 Security Notes

1. Never commit .env files
2. Use HTTPS in production
3. Configure CORS properly on backend
4. Set proper environment variables in cPanel

## 📚 Additional Resources

- cPanel File Manager: Use to upload files
- cPanel Node.js Selector: For building on server (if available)
- cPanel SSL/TLS: Enable SSL certificate

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

$frontendReadme | Out-File -FilePath (Join-Path $frontendTempDir "CPANEL_DEPLOYMENT_README.md") -Encoding UTF8

# Create frontend zip
Compress-Archive -Path "$frontendTempDir\*" -DestinationPath $frontendZipName -Force
Remove-Item -Path $frontendTempDir -Recurse -Force
$frontendSize = [math]::Round((Get-Item $frontendZipName).Length / 1MB, 2)
Write-Host "  ✅ Frontend cPanel zip created: $frontendZipName ($frontendSize MB)" -ForegroundColor Green
Write-Host ""

# ============================================
# 2. BACKEND ZIP (cPanel)
# ============================================
Write-Host "Creating Backend cPanel hosting zip..." -ForegroundColor Yellow
$backendZipName = "backend-cpanel-hosting-$timestamp.zip"
$backendTempDir = Join-Path $env:TEMP "sylhetlynews-backend-cpanel"

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

# Create .htaccess for backend (if using Apache with PHP proxy)
$backendHtaccess = @"
# Enable Rewrite Engine
RewriteEngine On

# Proxy to Node.js application (if using Apache proxy)
# Uncomment if using Apache as reverse proxy
# RewriteRule ^(.*)$ http://localhost:5000/\$1 [P,L]

# Or use for PHP fallback (if needed)
# RewriteCond %{REQUEST_FILENAME} !-f
# RewriteCond %{REQUEST_FILENAME} !-d
# RewriteRule ^(.*)$ index.php [QSA,L]
"@

$backendHtaccess | Out-File -FilePath (Join-Path $backendTempDir ".htaccess") -Encoding UTF8

# Create cPanel deployment README
$backendReadme = @"
# Sylhetly News - Backend cPanel Hosting Package

## 📦 Package Contents

This package contains the Express.js backend API server for cPanel hosting.

## 🚀 cPanel Deployment Steps

### Option 1: Node.js Application (cPanel Node.js Selector)

1. **Upload Files**
   - Extract this zip file
   - Upload all files to a directory (e.g., \`backend\` or \`api\`)

2. **Configure Node.js in cPanel**
   - Go to cPanel → Node.js Selector
   - Create a new Node.js application
   - Set Application Root: \`backend\` (or your directory)
   - Set Application URL: \`/api\` or your subdomain
   - Set Application Startup File: \`src/server.js\`
   - Select Node.js version (18.x or higher recommended)

3. **Set Environment Variables**
   - In Node.js Selector, add environment variables:
     - PORT (usually auto-set by cPanel)
     - NODE_ENV=production
     - FRONTEND_URL=https://your-frontend-domain.com
     - MONGODB_URI=your-mongodb-connection-string
     - ADMIN_EMAIL=your-admin-email
     - ADMIN_PASSWORD=your-secure-password
     - Firebase configuration variables

4. **Install Dependencies**
   - In Node.js Selector, click "Run NPM Install"
   - Or use SSH: \`cd backend && npm install\`

5. **Start Application**
   - In Node.js Selector, click "Start App"

### Option 2: SSH/VPS Deployment

1. **SSH Access**
   \`\`\`bash
   cd ~/backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

2. **Use PM2 (if available)**
   \`\`\`bash
   npm install -g pm2
   pm2 start src/server.js --name sylhetlynews-backend
   pm2 save
   \`\`\`

## 📝 Required Environment Variables

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

## 📁 Directory Structure

\`\`\`
backend/
├── src/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── models/
├── uploads/
├── package.json
└── .env
\`\`\`

## ⚙️ cPanel Node.js Selector Settings

- **Application Root**: \`backend\` (or your directory name)
- **Application URL**: \`/api\` or subdomain
- **Application Startup File**: \`src/server.js\`
- **Node.js Version**: 18.x or higher
- **Load App File**: \`src/server.js\`

## 🔒 Security Notes

1. Never commit .env files
2. Use strong admin passwords
3. Enable HTTPS
4. Configure CORS properly
5. Set proper file permissions for uploads directory (755)
6. Use environment variables for all secrets

## 📚 cPanel Features Used

- **Node.js Selector**: For running Node.js applications
- **File Manager**: For uploading files
- **SSH Access**: For command-line operations (if available)
- **SSL/TLS**: For HTTPS

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

$backendReadme | Out-File -FilePath (Join-Path $backendTempDir "CPANEL_DEPLOYMENT_README.md") -Encoding UTF8

# Create backend zip
Compress-Archive -Path "$backendTempDir\*" -DestinationPath $backendZipName -Force
Remove-Item -Path $backendTempDir -Recurse -Force
$backendSize = [math]::Round((Get-Item $backendZipName).Length / 1MB, 2)
Write-Host "  ✅ Backend cPanel zip created: $backendZipName ($backendSize MB)" -ForegroundColor Green
Write-Host ""

# ============================================
# 3. ADMIN ZIP (cPanel)
# ============================================
Write-Host "Creating Admin cPanel hosting zip..." -ForegroundColor Yellow
$adminZipName = "admin-cpanel-hosting-$timestamp.zip"
$adminTempDir = Join-Path $env:TEMP "sylhetlynews-admin-cpanel"

if (Test-Path $adminTempDir) {
    Remove-Item -Path $adminTempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $adminTempDir | Out-Null

# Copy admin files (excluding node_modules, .next, .env.local, out, build artifacts)
Write-Host "  - Copying admin files..." -ForegroundColor Cyan
Get-ChildItem -Path "admin" -Exclude "node_modules", ".next", ".env.local", ".env", "out", ".vite", "build" | 
    Copy-Item -Destination $adminTempDir -Recurse -Force

# Create .htaccess for Next.js static export (if using)
$adminHtaccess = @"
# Enable Rewrite Engine
RewriteEngine On

# For Next.js static export
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
"@

$adminHtaccess | Out-File -FilePath (Join-Path $adminTempDir ".htaccess") -Encoding UTF8

# Create cPanel deployment README
$adminReadme = @"
# Sylhetly News - Admin Panel cPanel Hosting Package

## 📦 Package Contents

This package contains the Next.js admin panel for cPanel hosting.

## 🚀 cPanel Deployment Steps

### Option 1: Next.js Application (cPanel Node.js Selector)

1. **Upload Files**
   - Extract this zip file
   - Upload all files to a directory (e.g., \`admin\` or subdomain)

2. **Configure Node.js in cPanel**
   - Go to cPanel → Node.js Selector
   - Create a new Node.js application
   - Set Application Root: \`admin\` (or your directory)
   - Set Application URL: \`/admin\` or your subdomain
   - Set Application Startup File: \`.next/server.js\` (after build)
   - Select Node.js version (18.x or higher recommended)

3. **Set Environment Variables**
   - In Node.js Selector, add environment variables:
     - NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
     - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     - NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
     - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
     - NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
     - NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com,admin2@example.com

4. **Install Dependencies**
   - In Node.js Selector, click "Run NPM Install"
   - Or use SSH: \`cd admin && npm install\`

5. **Build Application**
   - Use SSH: \`cd admin && npm run build\`
   - Or configure build script in Node.js Selector

6. **Start Application**
   - In Node.js Selector, click "Start App"

### Option 2: Static Export (Recommended for cPanel)

1. **Configure Static Export**
   - Edit \`next.config.ts\`:
   \`\`\`typescript
   output: 'export'
   \`\`\`

2. **Build Locally**
   \`\`\`bash
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   npm run build
   \`\`\`

3. **Upload out/ Folder**
   - Upload all contents of \`out/\` folder to \`public_html/admin/\` in cPanel
   - The .htaccess file is included for routing support

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

## 📁 Directory Structure

After deployment:
\`\`\`
admin/
├── .next/          # Build output (if using Node.js)
├── out/            # Static export (if using static export)
├── public/
├── src/
└── package.json
\`\`\`

## ⚙️ cPanel Node.js Selector Settings

- **Application Root**: \`admin\` (or your directory name)
- **Application URL**: \`/admin\` or subdomain
- **Application Startup File**: \`.next/server.js\` (after build)
- **Node.js Version**: 18.x or higher

## 🔒 Security Notes

1. Never commit .env.local files
2. Use HTTPS in production
3. Configure admin emails properly
4. Set proper Firebase security rules
5. Use environment variables for all secrets

## 📚 cPanel Features Used

- **Node.js Selector**: For running Next.js application
- **File Manager**: For uploading files
- **SSH Access**: For building (if available)
- **SSL/TLS**: For HTTPS

Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

$adminReadme | Out-File -FilePath (Join-Path $adminTempDir "CPANEL_DEPLOYMENT_README.md") -Encoding UTF8

# Create admin zip
Compress-Archive -Path "$adminTempDir\*" -DestinationPath $adminZipName -Force
Remove-Item -Path $adminTempDir -Recurse -Force
$adminSize = [math]::Round((Get-Item $adminZipName).Length / 1MB, 2)
Write-Host "  ✅ Admin cPanel zip created: $adminZipName ($adminSize MB)" -ForegroundColor Green
Write-Host ""

# ============================================
# SUMMARY
# ============================================
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ All cPanel hosting zip files created!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Files created:" -ForegroundColor Cyan
Write-Host "  1. $frontendZipName ($frontendSize MB)" -ForegroundColor White
Write-Host "  2. $backendZipName ($backendSize MB)" -ForegroundColor White
Write-Host "  3. $adminZipName ($adminSize MB)" -ForegroundColor White
Write-Host ""
Write-Host "Each zip contains:" -ForegroundColor Yellow
Write-Host "  - All necessary source files" -ForegroundColor White
Write-Host "  - CPANEL_DEPLOYMENT_README.md with cPanel-specific instructions" -ForegroundColor White
Write-Host "  - .htaccess files for Apache configuration" -ForegroundColor White
Write-Host "  - .env.example files for configuration" -ForegroundColor White
Write-Host ""
Write-Host "Ready for cPanel shared hosting! 🚀" -ForegroundColor Green
