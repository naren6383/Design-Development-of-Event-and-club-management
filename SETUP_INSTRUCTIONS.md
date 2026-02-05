# Complete Setup Instructions

## Step-by-Step Guide to Run the College Event Management System

### Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js installed (v14+) - Check with `node --version`
- [ ] MongoDB installed - Check with `mongod --version`
- [ ] Git (optional, for cloning)
- [ ] A code editor (VS Code recommended)
- [ ] Two terminal windows ready

### Step 1: Install MongoDB (if not installed)

#### Windows:
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Install MongoDB as a Service
4. Verify: Open Command Prompt and run `mongod --version`

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Step 2: Setup Backend

Open **Terminal 1** (for backend):

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env

# Edit .env file with your preferred editor
# Update these values:
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/college_event_management
JWT_SECRET=your_very_secret_key_change_this_123456789
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Step 3: Seed Database with Sample Data

```bash
# Still in backend directory
node data/sampleData.js

# You should see:
# ✅ Sample data imported successfully!
# 📧 Login Credentials:
# Admin: admin@college.edu / admin123
# Coordinator: john.coordinator@college.edu / password123
# Student: alice@college.edu / password123
```

### Step 4: Start Backend Server

```bash
# Still in Terminal 1
npm run dev

# You should see:
# MongoDB Connected: localhost
# Server running in development mode on port 5000
```

✅ Backend is now running on http://localhost:5000

### Step 5: Setup Frontend

Open **Terminal 2** (for frontend):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env

# Edit .env file
# It should contain:
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 6: Start Frontend Server

```bash
# Still in Terminal 2
npm start

# Browser should automatically open http://localhost:3000
# If not, manually open http://localhost:3000
```

✅ Frontend is now running on http://localhost:3000

### Step 7: Test the Application

1. **Open browser** and go to http://localhost:3000
2. **Test Student Login:**
   - Email: `alice@college.edu`
   - Password: `password123`
   - Click Login
   - You should see Student Dashboard

3. **Test Event Registration:**
   - Go to Events page
   - Click on any event
   - Click "Register Now"
   - Check your dashboard to see registered events

4. **Test Coordinator Login:**
   - Logout (top right)
   - Login with: `john.coordinator@college.edu` / `password123`
   - You should see Coordinator Dashboard with club management

5. **Test Admin Login:**
   - Logout
   - Login with: `admin@college.edu` / `admin123`
   - You should see Admin Dashboard with approval options

### Common Issues and Solutions

#### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

#### Issue: "Port 3000 already in use"
**Solution:**
Press `Y` when asked if you want to run on another port, or kill process:
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

#### Issue: "Cannot connect to MongoDB"
**Solution:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl status mongodb
   ```
2. Verify MONGO_URI in backend/.env
3. Try restarting MongoDB service

#### Issue: "Module not found"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: "CORS Error in Browser Console"
**Solution:**
1. Verify backend is running on port 5000
2. Check CLIENT_URL in backend/.env is `http://localhost:3000`
3. Restart backend server

#### Issue: "Cannot find .env file"
**Solution:**
Create .env files manually in both backend/ and frontend/ directories with the content from .env.example

### Stopping the Servers

**To stop backend:**
- Go to Terminal 1
- Press `Ctrl + C`

**To stop frontend:**
- Go to Terminal 2
- Press `Ctrl + C`

### Restarting Everything

```bash
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm start
```

### Project Structure Quick Reference

```
project-root/
├── backend/          # API Server (Port 5000)
│   ├── .env          # Create this file
│   └── ...
├── frontend/         # React App (Port 3000)
│   ├── .env          # Create this file
│   └── ...
└── README.md
```

### Next Steps

1. **Explore the UI:** Browse through all pages
2. **Test Different Roles:** Login as student, coordinator, and admin
3. **Create New Data:** Add new events, clubs
4. **Understand the Code:** Read through the code files
5. **Customize:** Modify colors, add features

### Database Management

**View database contents:**
```bash
# Open MongoDB shell
mongo

# Switch to database
use college_event_management

# View collections
show collections

# View users
db.users.find()

# View events
db.events.find()

# Exit
exit
```

**Reset database (clear all data):**
```bash
cd backend
node data/sampleData.js -d
```

**Re-seed database:**
```bash
cd backend
node data/sampleData.js
```

### Tips for Development

1. **Keep both terminals open** - You need both servers running
2. **Check console for errors** - Both terminal and browser console
3. **Save files to see changes** - React hot-reloads automatically
4. **Use demo credentials** - Don't waste time creating test accounts
5. **Read error messages** - They usually tell you exactly what's wrong

### Success Checklist

- [ ] MongoDB is installed and running
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] .env files created in both directories
- [ ] Database seeded with sample data
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Can login with demo credentials
- [ ] Can browse events and clubs
- [ ] Can register for events (as student)
- [ ] Can see different dashboards for different roles

### Need Help?

- Check error messages in terminal
- Check browser console (F12)
- Review the README.md file
- Make sure all environment variables are correct
- Ensure MongoDB is running
- Try restarting both servers

---

**Congratulations! 🎉** If you've completed all steps successfully, your College Event Management System is now running!
