import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">College Event Management</h3>
            <p className="text-gray-400">
              A comprehensive platform for managing college clubs, events, and
              student participation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/events" className="text-gray-400 hover:text-white transition">
                  Events
                </a>
              </li>
              <li>
                <a href="/clubs" className="text-gray-400 hover:text-white transition">
                  Clubs
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: events@college.edu</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: College Campus, City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 College Event Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
