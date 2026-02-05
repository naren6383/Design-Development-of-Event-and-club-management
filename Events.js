import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = filter === 'approved' ? { isApproved: true } : {};
      const response = await api.get('/events', { params });
      setEvents(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Workshop: 'bg-blue-100 text-blue-800',
      Seminar: 'bg-green-100 text-green-800',
      Competition: 'bg-yellow-100 text-yellow-800',
      Cultural: 'bg-pink-100 text-pink-800',
      Sports: 'bg-red-100 text-red-800',
      Hackathon: 'bg-purple-100 text-purple-800',
      Conference: 'bg-indigo-100 text-indigo-800',
      Exhibition: 'bg-orange-100 text-orange-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">All Events</h1>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Events</option>
            <option value="approved">Approved Only</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="card hover:shadow-xl transition"
            >
              {/* Event Banner Placeholder */}
              <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-48 rounded-t-lg -m-6 mb-4"></div>

              {/* Event Details */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">
                    {event.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">📅</span>
                    {formatDate(event.eventDate)} at {event.eventTime}
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">📍</span>
                    {event.venue}
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">🎯</span>
                    {event.club?.name || 'Unknown Club'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      event.isApproved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {event.isApproved ? 'Approved' : 'Pending'}
                  </span>
                  <Link
                    to={`/events/${event._id}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
