import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Link to="/" className="btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
