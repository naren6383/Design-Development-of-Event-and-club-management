# Commands Reference Guide

Quick reference for all commands you'll need for this project.

---

## 📦 Installation Commands

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

---

## 🚀 Running the Application

### Start Backend (Development)
```bash
cd backend
npm run dev
```

### Start Backend (Production)
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm start
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

---

## 🗄️ Database Commands

### Seed Database with Sample Data
```bash
cd backend
node data/sampleData.js
```

### Clear Database
```bash
cd backend
node data/sampleData.js -d
```

### Access MongoDB Shell
```bash
mongo
use college_event_management
show collections
db.users.find().pretty()
db.events.find().pretty()
db.clubs.find().pretty()
db.registrations.find().pretty()
exit
```

---

## 🔧 MongoDB Service Commands

### Windows
```bash
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check status (in PowerShell)
Get-Service MongoDB
```

### macOS (Homebrew)
```bash
# Start MongoDB
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community

# Restart MongoDB
brew services restart mongodb-community

# Check status
brew services list
```

### Linux (Ubuntu/Debian)
```bash
# Start MongoDB
sudo systemctl start mongod

# Stop MongoDB
sudo systemctl stop mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check status
sudo systemctl status mongod

# Enable auto-start on boot
sudo systemctl enable mongod
```

---

## 🔍 Troubleshooting Commands

### Check if Port is in Use

#### Windows
```bash
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 3000 (frontend)
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID <PID_NUMBER> /F
```

#### macOS/Linux
```bash
# Check port 5000
lsof -i :5000

# Check port 3000
lsof -i :3000

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Remove node_modules and Reinstall
```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install

# macOS/Linux
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Environment Setup Commands

### Create .env Files

#### Backend .env
```bash
cd backend
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env

# Then edit the file
```

#### Frontend .env
```bash
cd frontend
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env

# Then edit the file
```

---

## 🧪 Testing Commands

### Test Backend API (using curl)

```bash
# Health check
curl http://localhost:5000/

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@college.edu","password":"test123","role":"student"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.edu","password":"admin123"}'

# Get events (no auth needed)
curl http://localhost:5000/api/events

# Get events (with auth)
curl http://localhost:5000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔧 Git Commands (Optional)

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - College Event Management System"
```

### Create GitHub Repository
```bash
# After creating repo on GitHub
git remote add origin https://github.com/yourusername/college-event-management.git
git branch -M main
git push -u origin main
```

### Common Git Operations
```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout branch-name

# View commit history
git log --oneline
```

---

## 📊 NPM Commands

### Check Versions
```bash
# Node version
node --version

# npm version
npm --version

# Check package versions
npm list
```

### Update Dependencies
```bash
# Update all packages
npm update

# Update specific package
npm update package-name

# Check for outdated packages
npm outdated
```

### Install Specific Package
```bash
# Install and save to dependencies
npm install package-name

# Install and save to devDependencies
npm install --save-dev package-name

# Install globally
npm install -g package-name
```

---

## 🌐 Network Commands

### Check if Backend is Running
```bash
# Windows
curl http://localhost:5000

# macOS/Linux
curl http://localhost:5000

# Or open in browser
http://localhost:5000
```

### Check if Frontend is Running
```bash
# Open in browser
http://localhost:3000
```

### Find Your Local IP (for testing on other devices)
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
# or
ip addr show
```

---

## 📁 File Management Commands

### Navigate Directories
```bash
# Change to backend directory
cd backend

# Change to frontend directory
cd frontend

# Go back to parent directory
cd ..

# Go to project root
cd "C:\Users\Naren J\OneDrive\Desktop\Design and Development of a Web Application for College Event and Club Management"

# List files
# Windows
dir

# macOS/Linux
ls -la
```

### Create Files/Folders
```bash
# Create directory
mkdir foldername

# Create file
# Windows
type nul > filename.txt

# macOS/Linux
touch filename.txt
```

---

## 🔐 Security Commands

### Generate Strong Secret for JWT
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use online generator
# https://www.grc.com/passwords.htm
```

---

## 📦 Package Management

### Backend Dependencies
```bash
cd backend
npm install express mongoose bcryptjs jsonwebtoken dotenv cors morgan express-validator
npm install --save-dev nodemon
```

### Frontend Dependencies
```bash
cd frontend
npm install react react-dom react-router-dom axios
npm install --save-dev tailwindcss postcss autoprefixer
```

---

## 🎯 Quick Test Workflow

```bash
# Terminal 1 - Backend
cd backend
npm install
node data/sampleData.js
npm run dev

# Terminal 2 - Frontend (in a new terminal)
cd frontend
npm install
npm start

# Browser
# Open http://localhost:3000
# Login with: admin@college.edu / admin123
```

---

## 🐛 Debug Commands

### View Logs
```bash
# Backend logs (in terminal where backend is running)
# Logs will appear automatically

# Frontend logs
# Open browser console (F12)
```

### Check Environment Variables
```bash
# Windows
echo %PORT%

# macOS/Linux
echo $PORT

# Or in Node.js
node -e "console.log(process.env)"
```

---

## 📱 Development Tools

### Open in VS Code
```bash
# Open backend in VS Code
cd backend
code .

# Open frontend in VS Code
cd frontend
code .

# Open entire project
code .
```

### Format Code (if using Prettier)
```bash
# Format all files
npx prettier --write "**/*.{js,jsx,json,css,md}"
```

---

## 🚀 Deployment Commands

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Set Production Environment
```bash
# Windows
set NODE_ENV=production

# macOS/Linux
export NODE_ENV=production
```

### Run Production Build
```bash
cd backend
NODE_ENV=production npm start
```

---

## 📊 Monitoring Commands

### Check Process Status
```bash
# Windows
tasklist | findstr node

# macOS/Linux
ps aux | grep node
```

### Monitor Memory Usage
```bash
# Windows
tasklist /FI "IMAGENAME eq node.exe" /FO LIST

# macOS/Linux
top -p $(pgrep node)
```

---

## 🔄 Restart Commands

### Restart Everything
```bash
# Stop both terminals (Ctrl+C in each)
# Then restart:

# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start
```

### Clear Browser Cache
- **Chrome/Edge:** Ctrl+Shift+Delete
- **Firefox:** Ctrl+Shift+Delete
- Or use incognito/private mode

---

## 💡 Useful Aliases (Optional)

Add to your `.bashrc` or `.zshrc`:

```bash
# Backend aliases
alias backend="cd ~/path/to/project/backend && npm run dev"
alias seed="cd ~/path/to/project/backend && node data/sampleData.js"

# Frontend aliases
alias frontend="cd ~/path/to/project/frontend && npm start"

# Quick navigation
alias project="cd ~/path/to/project"
```

---

## 📝 Notes

- Always run commands from the correct directory (backend or frontend)
- Keep both terminals open when running the app
- Check console for errors if something doesn't work
- Make sure MongoDB is running before starting backend
- Create .env files before running the application

---

## 🆘 Emergency Commands

### Complete Reset
```bash
# Stop all Node processes
# Windows
taskkill /F /IM node.exe

# macOS/Linux
killall node

# Remove all dependencies and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install

# Reset database
cd ../backend
node data/sampleData.js -d
node data/sampleData.js

# Start fresh
npm run dev (in backend)
npm start (in frontend)
```

---

**Quick Reference:** Keep this file handy during development!
