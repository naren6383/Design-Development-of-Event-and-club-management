import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClubDetails();
    fetchClubEvents();
  }, [id]);

  const fetchClubDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/clubs/${id}`);
      setClub(response.data.data);
    } catch (err) {
      setError('Failed to fetch club details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClubEvents = async () => {
    try {
      const response = await api.get('/events', {
        params: { club: id, isApproved: true },
      });
      setEvents(response.data.data);
    } catch (err) {
      console.error('Error fetching club events:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <LoadingSpinner />;

  if (!club) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl text-gray-600">Club not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-primary-600 hover:text-primary-700 mb-4"
      >
        ← Back
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="card mb-8">
        {/* Club Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-5xl font-bold flex-shrink-0">
            {club.name.charAt(0)}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {club.name}
            </h1>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded text-sm">
                {club.category}
              </span>
              <span
                className={`px-3 py-1 rounded text-sm ${
                  club.isApproved
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {club.isApproved ? 'Approved' : 'Pending Approval'}
              </span>
            </div>

            <div className="space-y-2 text-gray-700">
              <div>
                <span className="font-semibold">Coordinator:</span>{' '}
                {club.coordinator?.name}
              </div>
              <div>
                <span className="font-semibold">Contact:</span>{' '}
                {club.contactEmail || club.coordinator?.email}
              </div>
              {club.coordinator?.phone && (
                <div>
                  <span className="font-semibold">Phone:</span>{' '}
                  {club.coordinator.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-3">About the Club</h2>
          <p className="text-gray-700">{club.description}</p>
        </div>
      </div>

      {/* Club Events */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No upcoming events from this club
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="block p-4 border rounded-lg hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.description.substring(0, 150)}...
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>📅 {formatDate(event.eventDate)}</span>
                      <span>📍 {event.venue}</span>
                      <span>🎯 {event.category}</span>
                    </div>
                  </div>
                  <div className="text-primary-600 hover:text-primary-700">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubDetails;
