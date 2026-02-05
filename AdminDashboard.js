import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClubs: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    pendingClubs: 0,
    pendingEvents: 0,
  });
  const [pendingClubs, setPendingClubs] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [usersRes, clubsRes, eventsRes, regsRes] = await Promise.all([
        api.get('/users'),
        api.get('/clubs'),
        api.get('/events'),
        api.get('/registrations'),
      ]);

      const allClubs = clubsRes.data.data;
      const allEvents = eventsRes.data.data;

      setStats({
        totalUsers: usersRes.data.count,
        totalClubs: allClubs.length,
        totalEvents: allEvents.length,
        totalRegistrations: regsRes.data.count,
        pendingClubs: allClubs.filter((c) => !c.isApproved).length,
        pendingEvents: allEvents.filter((e) => !e.isApproved).length,
      });

      setPendingClubs(allClubs.filter((c) => !c.isApproved).slice(0, 5));
      setPendingEvents(allEvents.filter((e) => !e.isApproved).slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClub = async (clubId) => {
    try {
      await api.put(`/clubs/${clubId}/approve`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving club:', error);
    }
  };

  const handleRejectClub = async (clubId) => {
    try {
      await api.put(`/clubs/${clubId}/reject`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting club:', error);
    }
  };

  const handleApproveEvent = async (eventId) => {
    try {
      await api.put(`/events/${eventId}/approve`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const handleRejectEvent = async (eventId) => {
    try {
      await api.put(`/events/${eventId}/reject`);
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="card mb-8 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-red-100">Manage all aspects of the platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
              <p className="text-gray-600">Total Users</p>
            </div>
            <div className="text-5xl">👥</div>
          </div>
          <Link
            to="/admin/users"
            className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
          >
            Manage Users →
          </Link>
        </div>

        <div className="card bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalClubs}
              </p>
              <p className="text-gray-600">Total Clubs</p>
            </div>
            <div className="text-5xl">🎯</div>
          </div>
          <Link
            to="/admin/clubs"
            className="text-green-600 hover:text-green-700 text-sm mt-2 inline-block"
          >
            Manage Clubs →
          </Link>
        </div>

        <div className="card bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {stats.totalEvents}
              </p>
              <p className="text-gray-600">Total Events</p>
            </div>
            <div className="text-5xl">📅</div>
          </div>
          <Link
            to="/admin/events"
            className="text-purple-600 hover:text-purple-700 text-sm mt-2 inline-block"
          >
            Manage Events →
          </Link>
        </div>

        <div className="card bg-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-orange-600">
                {stats.totalRegistrations}
              </p>
              <p className="text-gray-600">Registrations</p>
            </div>
            <div className="text-5xl">📋</div>
          </div>
          <Link
            to="/admin/registrations"
            className="text-orange-600 hover:text-orange-700 text-sm mt-2 inline-block"
          >
            View All →
          </Link>
        </div>

        <div className="card bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.pendingClubs}
              </p>
              <p className="text-gray-600">Pending Clubs</p>
            </div>
            <div className="text-5xl">⏳</div>
          </div>
        </div>

        <div className="card bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">
                {stats.pendingEvents}
              </p>
              <p className="text-gray-600">Pending Events</p>
            </div>
            <div className="text-5xl">⏳</div>
          </div>
        </div>
      </div>

      {/* Pending Clubs */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">Pending Club Approvals</h2>

        {pendingClubs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No pending club approvals
          </div>
        ) : (
          <div className="space-y-4">
            {pendingClubs.map((club) => (
              <div
                key={club._id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{club.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {club.description.substring(0, 100)}...
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Category: {club.category}</span>
                    <span>
                      Coordinator: {club.coordinator?.name || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleApproveClub(club._id)}
                    className="btn-success"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleRejectClub(club._id)}
                    className="btn-danger"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {stats.pendingClubs > 5 && (
          <div className="text-center mt-4">
            <Link
              to="/admin/clubs"
              className="text-primary-600 hover:text-primary-700"
            >
              View All Pending Clubs →
            </Link>
          </div>
        )}
      </div>

      {/* Pending Events */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Pending Event Approvals</h2>

        {pendingEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No pending event approvals
          </div>
        ) : (
          <div className="space-y-4">
            {pendingEvents.map((event) => (
              <div
                key={event._id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.description.substring(0, 100)}...
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                    <span>📍 {event.venue}</span>
                    <span>🎯 {event.club?.name}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleApproveEvent(event._id)}
                    className="btn-success"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleRejectEvent(event._id)}
                    className="btn-danger"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {stats.pendingEvents > 5 && (
          <div className="text-center mt-4">
            <Link
              to="/admin/events"
              className="text-primary-600 hover:text-primary-700"
            >
              View All Pending Events →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
