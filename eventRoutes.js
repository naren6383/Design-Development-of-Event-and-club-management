const express = require('express');
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  approveEvent,
  rejectEvent,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/').get(getAllEvents);
router.route('/:id').get(getEvent);

// Protected routes - Coordinator and Admin can create events
router
  .route('/')
  .post(protect, authorize('coordinator', 'admin'), createEvent);

router
  .route('/:id')
  .put(protect, authorize('coordinator', 'admin'), updateEvent)
  .delete(protect, authorize('coordinator', 'admin'), deleteEvent);

// Admin only routes
router.put('/:id/approve', protect, authorize('admin'), approveEvent);
router.put('/:id/reject', protect, authorize('admin'), rejectEvent);

module.exports = router;
