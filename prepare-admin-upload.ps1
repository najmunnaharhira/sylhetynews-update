# PowerShell script to prepare admin files for manual Firebase Hosting upload
# This creates a ready-to-upload folder with all necessary files

Write-Host "📦 Preparing admin files for manual upload..." -ForegroundColor Green
Write-Host ""

$adminDist = "admin\dist"
$uploadFolder = "admin-firebase-upload"

# Check if dist folder exists
if (-not (Test-Path $adminDist)) {
    Write-Host "❌ Error: admin\dist folder not found!" -ForegroundColor Red
    Write-Host "   Please run 'cd admin && npm run build' first" -ForegroundColor Yellow
    exit 1
}

# Create upload folder
if (Test-Path $uploadFolder) {
    Remove-Item -Path $uploadFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $uploadFolder | Out-Null

Write-Host "✅ Copying files from admin\dist..." -ForegroundColor Cyan

# Copy all files from dist folder
Copy-Item -Path "$adminDist\*" -Destination $uploadFolder -Recurse -Force

# Create .htaccess for reference (Firebase doesn't need it, but good to have)
$htaccessContent = "# Firebase Hosting handles rewrites automatically`n# This file is for reference only"
$htaccessContent | Out-File -FilePath "$uploadFolder\.htaccess" -Encoding UTF8

# Create README with upload instructions
$readmeLines = @(
    "# Admin App - Ready for Firebase Hosting Upload",
    "",
    "## 📁 What's in this folder?",
    "",
    "This folder contains all the files needed to deploy your admin app to Firebase Hosting.",
    "",
    "## 🚀 How to Upload Manually",
    "",
    "### Option 1: Firebase Console (Web Interface)",
    "",
    "1. Go to https://console.firebase.google.com",
    "2. Select project: sylhetly-news",
    "3. Click Hosting in left sidebar",
    "4. Click Get started or Add another site",
    "5. Upload all files from this folder",
    "",
    "### Option 2: Firebase CLI (Recommended - Still Manual!)",
    "",
    "Even though it's a command, it's the easiest way:",
    "firebase login",
    "firebase use sylhetly-news",
    "firebase deploy --only hosting",
    "",
    "## 📋 Files Included",
    "",
    "- index.html (Main app file)",
    "- assets/ (CSS and JavaScript files)",
    "",
    "## ✅ After Upload",
    "",
    "Your admin will be available at:",
    "- https://sylhetly-news.web.app",
    "",
    "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$readmeLines -join "`n" | Out-File -FilePath "$uploadFolder\README.txt" -Encoding UTF8

Write-Host ""
Write-Host "✅ Files prepared successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Upload folder created: $uploadFolder" -ForegroundColor Cyan
Write-Host ""
Write-Host "📤 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Go to Firebase Console: https://console.firebase.google.com" -ForegroundColor White
Write-Host "   2. Select project: sylhetly-news" -ForegroundColor White
Write-Host "   3. Go to Hosting section" -ForegroundColor White
Write-Host "   4. Upload all files from '$uploadFolder' folder" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tip: Or use Firebase CLI (still manual!):" -ForegroundColor Yellow
Write-Host "   firebase deploy --only hosting" -ForegroundColor White
Write-Host ""
