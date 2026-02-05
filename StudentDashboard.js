import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [regsResponse, eventsResponse] = await Promise.all([
        api.get('/registrations/my-registrations'),
        api.get('/events', { params: { isApproved: true } }),
      ]);

      setRegistrations(regsResponse.data.data);
      setUpcomingEvents(eventsResponse.data.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="card mb-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-primary-100">Student Dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-blue-50">
          <div className="flex items-center">
            <div className="text-4xl mr-4">📋</div>
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {registrations.length}
              </p>
              <p className="text-gray-600">My Registrations</p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50">
          <div className="flex items-center">
            <div className="text-4xl mr-4">📅</div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {upcomingEvents.length}
              </p>
              <p className="text-gray-600">Upcoming Events</p>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50">
          <div className="flex items-center">
            <div className="text-4xl mr-4">👤</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {user?.department}
              </p>
              <p className="text-gray-600">Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Registrations */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Event Registrations</h2>
          {registrations.length > 0 && (
            <Link
              to="/student/my-events"
              className="text-primary-600 hover:text-primary-700"
            >
              View All →
            </Link>
          )}
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p className="mb-4">You haven't registered for any events yet.</p>
            <Link to="/events" className="btn-primary">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Venue
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {registrations.slice(0, 5).map((registration) => (
                  <tr key={registration._id}>
                    <td className="px-4 py-3">
                      {registration.event?.title || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {registration.event?.eventDate
                        ? formatDate(registration.event.eventDate)
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {registration.event?.venue || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          registration.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : registration.status === 'attended'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/events/${registration.event?._id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link
            to="/events"
            className="text-primary-600 hover:text-primary-700"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📅 {formatDate(event.eventDate)}</p>
                <p>📍 {event.venue}</p>
                <p>🎯 {event.club?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
