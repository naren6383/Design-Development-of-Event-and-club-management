import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Clubs from './pages/Clubs';
import ClubDetails from './pages/ClubDetails';
import Unauthorized from './pages/Unauthorized';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';

// Coordinator Pages
import CoordinatorDashboard from './pages/CoordinatorDashboard';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';

// Shared Pages
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/clubs/:id" element={<ClubDetails />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/my-events"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <StudentDashboard /> 
                  </PrivateRoute>
                }
              />

              {/* Coordinator Routes */}
              <Route
                path="/coordinator/dashboard"
                element={
                  <PrivateRoute allowedRoles={['coordinator']}>
                    <CoordinatorDashboard />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute allowedRoles={['admin']}> 
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              {/* Shared Protected Routes */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-8">
                      The page you're looking for doesn't exist. 
                    </p>
                    <a href="/" className="btn-primary">
                      Go to Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
