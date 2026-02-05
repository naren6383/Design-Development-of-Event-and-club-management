# Quick Start Guide

Get your College Event Management System running in 10 minutes!

## Prerequisites

✅ Node.js installed  
✅ MongoDB installed and running  

## Step 1: Backend Setup (Terminal 1)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your settings
node data/sampleData.js
npm run dev
```

✅ Backend running on http://localhost:5000

## Step 2: Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
cp .env.example .env
# Make sure REACT_APP_API_URL=http://localhost:5000/api
npm start
```

✅ Frontend running on http://localhost:3000

## Step 3: Login and Test

Open http://localhost:3000 and login with:

**Admin:**
- Email: `admin@college.edu`
- Password: `admin123`

**Coordinator:**
- Email: `john.coordinator@college.edu`
- Password: `password123`

**Student:**
- Email: `alice@college.edu`
- Password: `password123`

## What to Test

1. ✅ Browse events at `/events`
2. ✅ View clubs at `/clubs`
3. ✅ Login as student and register for an event
4. ✅ Login as coordinator to see dashboard
5. ✅ Login as admin to approve clubs/events

## File Structure

```
project/
├── backend/        ← API Server
│   ├── .env        ← Create this!
│   └── ...
├── frontend/       ← React App  
│   ├── .env        ← Create this!
│   └── ...
└── README.md
```

## Environment Files

### backend/.env
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/college_event_management
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### frontend/.env
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

**MongoDB not connecting?**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongodb
```

**Port already in use?**
```bash
# Kill port 5000
lsof -ti:5000 | xargs kill -9

# Kill port 3000
lsof -ti:3000 | xargs kill -9
```

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. 📖 Read the [full README](README.md)
2. 📘 Check [Setup Instructions](SETUP_INSTRUCTIONS.md)
3. 📗 Review [API Documentation](API_DOCUMENTATION.md)
4. 📝 See [Project Report Outline](PROJECT_REPORT_OUTLINE.md)

## Key Features to Explore

- 🎯 **Role-based dashboards** - Different views for admin, coordinator, student
- 📅 **Event management** - Create, approve, and register for events
- 🎪 **Club system** - Manage clubs with approval workflows
- 🔐 **Authentication** - Secure JWT-based auth
- 📱 **Responsive design** - Works on mobile and desktop
- ✅ **Approval workflows** - Admin approves clubs and events

## Project Structure Overview

### Backend (Node.js + Express)
- `/models` - MongoDB schemas
- `/controllers` - Business logic
- `/routes` - API endpoints
- `/middleware` - Auth & error handling

### Frontend (React)
- `/components` - Reusable components
- `/pages` - Page components
- `/context` - State management
- `/config` - API configuration

## Technology Stack

**Frontend:** React, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT  
**Database:** MongoDB

## Default Users

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@college.edu | admin123 |
| Coordinator | john.coordinator@college.edu | password123 |
| Student | alice@college.edu | password123 |

## Common Commands

```bash
# Start backend (development)
cd backend && npm run dev

# Start frontend
cd frontend && npm start

# Seed database
cd backend && node data/sampleData.js

# Clear database
cd backend && node data/sampleData.js -d

# Build frontend for production
cd frontend && npm run build
```

## Production Deployment

1. Set `NODE_ENV=production` in backend
2. Use MongoDB Atlas for database
3. Deploy backend to Heroku/Railway
4. Deploy frontend to Vercel/Netlify
5. Update environment variables

## Help & Support

- Check console for errors (both terminal and browser)
- Verify MongoDB is running
- Ensure both servers are running
- Check .env files are created correctly
- Review error messages carefully

---

**🎉 You're all set!** Start exploring the application and customize it for your needs.

For detailed instructions, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)
