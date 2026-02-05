const Club = require('../models/Club');
const User = require('../models/User');

/**
 * @desc    Get all clubs
 * @route   GET /api/clubs
 * @access  Public
 */
exports.getAllClubs = async (req, res) => {
  try {
    let query = {};

    // Filter by approval status if specified
    if (req.query.isApproved !== undefined) {
      query.isApproved = req.query.isApproved === 'true';
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }

    const clubs = await Club.find(query)
      .populate('coordinator', 'name email phone')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get single club
 * @route   GET /api/clubs/:id
 * @access  Public
 */
exports.getClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('coordinator', 'name email phone')
      .populate('members', 'name email department year');

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Create new club
 * @route   POST /api/clubs
 * @access  Private/Coordinator, Admin
 */
exports.createClub = async (req, res) => {
  try {
    const { name, description, category, contactEmail, logo } = req.body;

    // Set coordinator to current user if coordinator, or specified user if admin
    let coordinatorId = req.user.id;
    
    if (req.user.role === 'admin' && req.body.coordinator) {
      coordinatorId = req.body.coordinator;
    }

    // Check if coordinator already manages a club
    const existingClub = await Club.findOne({ coordinator: coordinatorId });
    if (existingClub) {
      return res.status(400).json({
        success: false,
        message: 'This coordinator already manages a club',
      });
    }

    const club = await Club.create({
      name,
      description,
      category,
      coordinator: coordinatorId,
      contactEmail,
      logo,
      isApproved: req.user.role === 'admin', // Auto-approve if created by admin
    });

    // Update user's managedClub field
    await User.findByIdAndUpdate(coordinatorId, { managedClub: club._id });

    const populatedClub = await Club.findById(club._id).populate(
      'coordinator',
      'name email phone'
    );

    res.status(201).json({
      success: true,
      data: populatedClub,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update club
 * @route   PUT /api/clubs/:id
 * @access  Private/Coordinator (own club), Admin
 */
exports.updateClub = async (req, res) => {
  try {
    let club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    // Check ownership (coordinator can only update their own club)
    if (
      req.user.role === 'coordinator' &&
      club.coordinator.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this club',
      });
    }

    club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('coordinator', 'name email phone');

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete club
 * @route   DELETE /api/clubs/:id
 * @access  Private/Admin
 */
exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    // Remove managedClub reference from coordinator
    await User.findByIdAndUpdate(club.coordinator, { managedClub: null });

    await club.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Club deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Approve club
 * @route   PUT /api/clubs/:id/approve
 * @access  Private/Admin
 */
exports.approveClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate('coordinator', 'name email phone');

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Reject club
 * @route   PUT /api/clubs/:id/reject
 * @access  Private/Admin
 */
exports.rejectClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    ).populate('coordinator', 'name email phone');

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
