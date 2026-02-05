import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'coordinator':
        return '/coordinator/dashboard';
      case 'student':
        return '/student/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to College Event Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover, manage, and participate in exciting college events and clubs.
            Join a vibrant community of students and organizers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to={getDashboardLink()}
                className="btn-primary text-lg px-8 py-3"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Event Management</h3>
            <p className="text-gray-600">
              Browse and register for upcoming college events. Stay updated with
              all activities happening on campus.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Club Activities</h3>
            <p className="text-gray-600">
              Explore various clubs, join your favorites, and participate in club
              activities and competitions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Easy Registration</h3>
            <p className="text-gray-600">
              Simple and quick event registration process. Track all your
              registered events in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of students already using our platform
          </p>
          <Link
            to="/events"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition font-semibold text-lg inline-block"
          >
            Explore Events
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-gray-600">Active Clubs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">200+</div>
            <div className="text-gray-600">Events Per Year</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">5000+</div>
            <div className="text-gray-600">Students</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
