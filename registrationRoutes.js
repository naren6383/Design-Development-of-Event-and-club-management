const express = require('express');
const {
  getAllRegistrations,
  getRegistration,
  createRegistration,
  getMyRegistrations,
  getMyEventRegistrations,
  updateRegistration,
  cancelRegistration,
} = require('../controllers/registrationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Student routes
router.post('/', authorize('student'), createRegistration);
router.get('/my-registrations', authorize('student'), getMyRegistrations);
router.delete('/:id', authorize('student'), cancelRegistration);

// Coordinator routes
router.get(
  '/my-events',
  authorize('coordinator'),
  getMyEventRegistrations
);

// Coordinator and Admin routes
router.put(
  '/:id',
  authorize('coordinator', 'admin'),
  updateRegistration
);

// Admin routes
router.get('/', authorize('admin'), getAllRegistrations);
router.get('/:id', getRegistration);

module.exports = router;
