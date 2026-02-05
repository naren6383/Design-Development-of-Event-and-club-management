import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isStudent } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetchEvent();
    if (isAuthenticated && isStudent) {
      checkRegistration();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${id}`);
      setEvent(response.data.data);
    } catch (err) {
      setError('Failed to fetch event details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    try {
      const response = await api.get('/registrations/my-registrations');
      const registered = response.data.data.some(
        (reg) => reg.event._id === id
      );
      setIsRegistered(registered);
    } catch (err) {
      console.error('Error checking registration:', err);
    }
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setRegistering(true);
      setError('');
      await api.post('/registrations', {
        event: id,
        comments,
      });
      setSuccess('Successfully registered for the event!');
      setIsRegistered(true);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to register for event'
      );
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl text-gray-600">Event not found</p>
        </div>
      </div>
    );
  }

  const isRegistrationOpen =
    new Date() < new Date(event.registrationDeadline) &&
    event.isApproved &&
    event.isActive;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-primary-600 hover:text-primary-700 mb-4"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Banner Placeholder */}
            <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-64 rounded-lg -m-6 mb-6"></div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded text-sm">
                {event.category}
              </span>
              <span
                className={`px-3 py-1 rounded text-sm ${
                  event.isApproved
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {event.isApproved ? 'Approved' : 'Pending Approval'}
              </span>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-3">About this Event</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-3">Requirements</h2>
              <p className="text-gray-700">{event.requirements}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Event Details</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-semibold">
                  {formatDate(event.eventDate)}
                  <br />
                  {event.eventTime}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Venue</p>
                <p className="font-semibold">{event.venue}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Organized By</p>
                <p className="font-semibold">{event.club?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Max Participants</p>
                <p className="font-semibold">{event.maxParticipants}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Registration Deadline</p>
                <p className="font-semibold">
                  {formatDate(event.registrationDeadline)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-semibold">{event.club?.contactEmail}</p>
              </div>
            </div>

            {/* Registration Section */}
            {isStudent && (
              <div className="mt-6 pt-6 border-t">
                {success && (
                  <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {isRegistered ? (
                  <div className="text-center">
                    <p className="text-green-600 font-semibold mb-2">
                      ✓ You are registered
                    </p>
                    <button
                      onClick={() => navigate('/student/my-events')}
                      className="btn-secondary w-full"
                    >
                      View My Events
                    </button>
                  </div>
                ) : (
                  <>
                    {isRegistrationOpen ? (
                      <>
                        <textarea
                          placeholder="Comments (optional)"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          className="input-field mb-4"
                          rows="3"
                        />
                        <button
                          onClick={handleRegister}
                          disabled={registering}
                          className="btn-primary w-full"
                        >
                          {registering ? 'Registering...' : 'Register Now'}
                        </button>
                      </>
                    ) : (
                      <div className="text-center text-gray-600">
                        <p className="mb-2">Registration Closed</p>
                        {!event.isApproved && (
                          <p className="text-sm">Event pending approval</p>
                        )}
                        {new Date() >= new Date(event.registrationDeadline) && (
                          <p className="text-sm">Deadline has passed</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {!isAuthenticated && (
              <div className="mt-6 pt-6 border-t text-center">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary w-full"
                >
                  Login to Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
