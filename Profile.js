import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    department: user?.department || '',
    year: user?.year || '',
    rollNumber: user?.rollNumber || '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.put('/auth/profile', formData);
      updateUser(response.data.data);
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (Cannot be changed)
                </label>
                <input
                  type="email"
                  value={user?.email}
                  className="input-field bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              {user?.role === 'student' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: user?.name || '',
                      phone: user?.phone || '',
                      department: user?.department || '',
                      year: user?.year || '',
                      rollNumber: user?.rollNumber || '',
                    });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{user?.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-semibold capitalize">{user?.role}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-semibold">{user?.phone || 'Not provided'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-semibold">
                  {user?.department || 'Not provided'}
                </p>
              </div>

              {user?.role === 'student' && (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-semibold">
                      {user?.year ? `${user.year}th Year` : 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-semibold">
                      {user?.rollNumber || 'Not provided'}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
