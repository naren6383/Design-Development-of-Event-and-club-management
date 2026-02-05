import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'coordinator':
        return '/coordinator/dashboard';
      case 'student':
        return '/student/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold">
            College Events
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/events" className="hover:text-primary-200 transition">
              Events
            </Link>
            <Link to="/clubs" className="hover:text-primary-200 transition">
              Clubs
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="hover:text-primary-200 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-primary-200 transition"
                >
                  Profile
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm">
                    {user?.name} ({user?.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-primary-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/events"
                className="hover:text-primary-200 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/clubs"
                className="hover:text-primary-200 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Clubs
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="hover:text-primary-200 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="hover:text-primary-200 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="text-sm pt-2 border-t border-primary-500">
                    {user?.name} ({user?.role})
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition font-semibold text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:text-primary-200 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition font-semibold text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
