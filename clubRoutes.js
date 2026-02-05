const express = require('express');
const {
  getAllClubs,
  getClub,
  createClub,
  updateClub,
  deleteClub,
  approveClub,
  rejectClub,
} = require('../controllers/clubController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/').get(getAllClubs);
router.route('/:id').get(getClub);

// Protected routes - Coordinator and Admin can create clubs
router
  .route('/')
  .post(protect, authorize('coordinator', 'admin'), createClub);

router
  .route('/:id')
  .put(protect, authorize('coordinator', 'admin'), updateClub);

// Admin only routes
router.delete('/:id', protect, authorize('admin'), deleteClub);
router.put('/:id/approve', protect, authorize('admin'), approveClub);
router.put('/:id/reject', protect, authorize('admin'), rejectClub);

module.exports = router;
