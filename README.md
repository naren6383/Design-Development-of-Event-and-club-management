# College Event and Club Management System

A comprehensive web application for managing college clubs, events, registrations, and student participation. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🎯 Project Overview

This system streamlines the management of college activities by providing:
- Event creation and management
- Club registration and approval
- Student event registration
- Role-based access control
- Admin approval workflows

## 👥 User Roles

### 1. Admin
- Approve or reject club applications
- Approve or reject event proposals
- Manage all users
- View all registrations
- Manage coordinators

### 2. Club Coordinator
- Create and manage club details
- Create events under their club
- View registered students for events
- Manage event details

### 3. Student
- Browse clubs and events
- Register for events
- View registered events
- Update personal profile

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5, CSS3
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📂 Project Structure

```
college-event-management/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── clubController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Club.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── clubRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── data/
│   │   └── sampleData.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── LoadingSpinner.js
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Events.js
│   │   │   ├── EventDetails.js
│   │   │   ├── Clubs.js
│   │   │   ├── ClubDetails.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── CoordinatorDashboard.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Profile.js
│   │   │   └── Unauthorized.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── README.md
└── README.md (this file)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation Steps

#### 1. Clone the repository
```bash
git clone <repository-url>
cd college-event-management
```

#### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/college_event_management
# JWT_SECRET=your_secret_key
# JWT_EXPIRE=7d
# CLIENT_URL=http://localhost:3000

# Start MongoDB (if not running)
# On Windows: net start MongoDB
# On Mac/Linux: sudo systemctl start mongod

# Seed database with sample data
node data/sampleData.js

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env
# REACT_APP_API_URL=http://localhost:5000/api

# Start frontend
npm start
```

Frontend will run on `http://localhost:3000`

## 🔑 Demo Credentials

After running the seeder script, use these credentials:

### Admin Account
- Email: `admin@college.edu`
- Password: `admin123`

### Coordinator Account
- Email: `john.coordinator@college.edu`
- Password: `password123`

### Student Account
- Email: `alice@college.edu`
- Password: `password123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/coordinators` - Get all coordinators

### Clubs
- `GET /api/clubs` - Get all clubs (Public)
- `GET /api/clubs/:id` - Get single club (Public)
- `POST /api/clubs` - Create club (Coordinator, Admin)
- `PUT /api/clubs/:id` - Update club (Coordinator, Admin)
- `DELETE /api/clubs/:id` - Delete club (Admin)
- `PUT /api/clubs/:id/approve` - Approve club (Admin)
- `PUT /api/clubs/:id/reject` - Reject club (Admin)

### Events
- `GET /api/events` - Get all events (Public)
- `GET /api/events/:id` - Get single event (Public)
- `POST /api/events` - Create event (Coordinator, Admin)
- `PUT /api/events/:id` - Update event (Coordinator, Admin)
- `DELETE /api/events/:id` - Delete event (Coordinator, Admin)
- `PUT /api/events/:id/approve` - Approve event (Admin)
- `PUT /api/events/:id/reject` - Reject event (Admin)

### Registrations
- `GET /api/registrations` - Get all registrations (Admin)
- `GET /api/registrations/:id` - Get single registration (Private)
- `POST /api/registrations` - Register for event (Student)
- `GET /api/registrations/my-registrations` - Get my registrations (Student)
- `GET /api/registrations/my-events` - Get coordinator's event registrations (Coordinator)
- `PUT /api/registrations/:id` - Update registration status (Coordinator, Admin)
- `DELETE /api/registrations/:id` - Cancel registration (Student)

## ✨ Features

### Frontend Features
- ✅ Responsive design for mobile and desktop
- ✅ Role-based dashboards
- ✅ Event listing with filters
- ✅ Event registration with validation
- ✅ Club browsing and details
- ✅ User profile management
- ✅ Protected routes with authentication
- ✅ Form validation and error handling
- ✅ Loading states and feedback

### Backend Features
- ✅ RESTful API architecture
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Password hashing with bcrypt
- ✅ MongoDB schemas with Mongoose
- ✅ Error handling middleware
- ✅ Environment variable support
- ✅ CORS configuration
- ✅ Request logging (development)

## 🧪 Testing the Application

### Test Admin Workflow
1. Login as admin
2. View pending club approvals
3. Approve or reject clubs
4. View pending event approvals
5. Approve or reject events
6. View all users and registrations

### Test Coordinator Workflow
1. Login as coordinator
2. Create a club
3. Wait for admin approval (or login as admin to approve)
4. Create an event for your club
5. View event registrations

### Test Student Workflow
1. Login as student
2. Browse events
3. View event details
4. Register for an event
5. View registered events in dashboard
6. Update profile information

## 📸 Screenshots Description

For your project report, include screenshots of:

1. **Home Page** - Landing page with features overview
2. **Login Page** - User authentication
3. **Registration Page** - New user signup
4. **Events Listing** - Grid of all events with filters
5. **Event Details** - Complete event information with registration
6. **Clubs Listing** - All clubs with categories
7. **Student Dashboard** - Student's personalized view
8. **Coordinator Dashboard** - Club and event management
9. **Admin Dashboard** - System administration with approval queues
10. **Profile Page** - User profile editing
11. **Mobile Responsive Views** - Mobile menu and layouts

## 🔧 Configuration

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/college_event_management
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 Database Schema

### User
- name, email, password (hashed)
- role (student, coordinator, admin)
- phone, department, year, rollNumber
- managedClub (for coordinators)

### Club
- name, description, category
- coordinator (ref: User)
- members (ref: User[])
- contactEmail, logo
- isApproved, isActive

### Event
- title, description
- club (ref: Club)
- eventDate, eventTime, venue
- category, maxParticipants
- registrationDeadline
- createdBy (ref: User)
- isApproved, isActive

### Registration
- event (ref: Event)
- student (ref: User)
- status (pending, confirmed, cancelled, attended)
- comments, registrationDate

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify MongoDB port (default: 27017)

### CORS Errors
- Verify CLIENT_URL in backend .env
- Check if both servers are running
- Clear browser cache

### Port Already in Use
```bash
# Find and kill process on port 5000 (backend)
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables
2. Ensure MongoDB Atlas or cloud MongoDB is configured
3. Update MONGO_URI
4. Deploy backend

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the frontend: `npm run build`
2. Set REACT_APP_API_URL to production backend URL
3. Deploy the build folder

## 📚 Additional Documentation

- [Backend API Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)

## 🤝 Contributing

This is a college project. For educational purposes only.

## 📄 License

ISC License

## 👨‍💻 Author

Final Year College Project

## 🎓 Project Report Sections

For your college project report, include:

1. **Abstract** - Brief overview of the system
2. **Introduction** - Problem statement and objectives
3. **Literature Survey** - Research on existing systems
4. **System Analysis** - Requirements and feasibility
5. **System Design** - Architecture, ER diagrams, flowcharts
6. **Implementation** - Technology stack, code snippets
7. **Testing** - Test cases and results
8. **Screenshots** - UI screenshots with descriptions
9. **Conclusion** - Summary and future scope
10. **References** - Technology documentation, resources

## 📈 Future Enhancements

- Email notifications for event registrations
- Certificate generation for event participation
- Payment integration for paid events
- Event calendar view
- Advanced search and filters
- File upload for club logos and event banners
- Real-time chat for club members
- Analytics dashboard
- Mobile app version

---

**Note:** This is a complete, production-ready application suitable for a final-year college project. Ensure you understand all components and can explain the architecture, design patterns, and implementation details during your project presentation.
