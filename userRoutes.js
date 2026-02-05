const express = require('express');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getCoordinators,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and only accessible by admin
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getAllUsers);
router.route('/coordinators').get(getCoordinators);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
