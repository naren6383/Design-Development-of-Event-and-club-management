import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const CoordinatorDashboard = () => {
  const { user } = useAuth();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch club details if coordinator has a managed club
      if (user?.managedClub) {
        const clubResponse = await api.get(`/clubs/${user.managedClub}`);
        setClub(clubResponse.data.data);

        // Fetch events for this club
        const eventsResponse = await api.get('/events', {
          params: { club: user.managedClub },
        });
        setEvents(eventsResponse.data.data);
      }

      // Fetch registrations for coordinator's events
      const regsResponse = await api.get('/registrations/my-events');
      setRegistrations(regsResponse.data.data);
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
      <div className="card mb-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-purple-100">Coordinator Dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-blue-50">
          <div className="flex items-center">
            <div className="text-4xl mr-4">🎯</div>
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {club ? 1 : 0}
              </p>
              <p className="text-gray-600">My Club</p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50">
          <div className="flex items-center">
            <div className="text-4xl mr-4">📅</div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {events.length}
              </p>
              <p className="text-gray-600">My Events</p>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50">
          <div className="flex items-center">
            <div className="text-4xl mr-4">📋</div>
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {registrations.length}
              </p>
              <p className="text-gray-600">Registrations</p>
            </div>
          </div>
        </div>

        <div className="card bg-orange-50">
          <div className="flex items-center">
            <div className="text-4xl mr-4">✓</div>
            <div>
              <p className="text-3xl font-bold text-orange-600">
                {events.filter((e) => e.isApproved).length}
              </p>
              <p className="text-gray-600">Approved Events</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Club */}
      {club ? (
        <div className="card mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{club.name}</h2>
              <p className="text-gray-600">{club.description}</p>
            </div>
            <Link
              to={`/coordinator/manage-club/${club._id}`}
              className="btn-primary"
            >
              Manage Club
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-semibold">{club.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold">
                {club.isApproved ? (
                  <span className="text-green-600">✓ Approved</span>
                ) : (
                  <span className="text-yellow-600">⏳ Pending</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact</p>
              <p className="font-semibold">{club.contactEmail}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card mb-8 text-center">
          <p className="text-gray-600 mb-4">
            You don't have a club assigned yet.
          </p>
          <Link to="/coordinator/create-club" className="btn-primary">
            Create a Club
          </Link>
        </div>
      )}

      {/* My Events */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Events</h2>
          {club && (
            <Link to="/coordinator/create-event" className="btn-primary">
              Create Event
            </Link>
          )}
        </div>

        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p className="mb-4">You haven't created any events yet.</p>
            {club && (
              <Link to="/coordinator/create-event" className="btn-primary">
                Create First Event
              </Link>
            )}
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
                {events.map((event) => (
                  <tr key={event._id}>
                    <td className="px-4 py-3">{event.title}</td>
                    <td className="px-4 py-3">
                      {formatDate(event.eventDate)}
                    </td>
                    <td className="px-4 py-3">{event.venue}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          event.isApproved
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {event.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/coordinator/manage-event/${event._id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Registrations */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Recent Registrations</h2>

        {registrations.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No registrations yet for your events.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {registrations.slice(0, 5).map((registration) => (
                  <tr key={registration._id}>
                    <td className="px-4 py-3">
                      {registration.student?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {registration.event?.title || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {registration.student?.department || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        {registration.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
