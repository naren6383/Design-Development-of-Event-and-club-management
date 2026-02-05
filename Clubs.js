import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchClubs();
  }, [filter]);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const params = filter === 'approved' ? { isApproved: true } : {};
      const response = await api.get('/clubs', { params });
      setClubs(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch clubs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technical: 'bg-blue-100 text-blue-800',
      Cultural: 'bg-pink-100 text-pink-800',
      Sports: 'bg-red-100 text-red-800',
      'Social Service': 'bg-green-100 text-green-800',
      Arts: 'bg-purple-100 text-purple-800',
      Literary: 'bg-indigo-100 text-indigo-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">College Clubs</h1>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Clubs</option>
            <option value="approved">Approved Only</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {clubs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No clubs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="card hover:shadow-xl transition"
            >
              {/* Club Logo Placeholder */}
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {club.name.charAt(0)}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {club.name}
              </h3>

              <div className="flex justify-center mb-4">
                <span
                  className={`text-xs px-3 py-1 rounded ${getCategoryColor(
                    club.category
                  )}`}
                >
                  {club.category}
                </span>
              </div>

              <p className="text-gray-600 text-center mb-4 line-clamp-3">
                {club.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center justify-center">
                  <span className="font-semibold mr-2">Coordinator:</span>
                  {club.coordinator?.name || 'Not assigned'}
                </div>
                <div className="flex items-center justify-center">
                  <span className="font-semibold mr-2">Contact:</span>
                  {club.contactEmail || 'N/A'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    club.isApproved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {club.isApproved ? 'Approved' : 'Pending'}
                </span>
                <Link
                  to={`/clubs/${club._id}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clubs;
