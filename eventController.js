const Event = require('../models/Event');
const Club = require('../models/Club');

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
exports.getAllEvents = async (req, res) => {
  try {
    let query = {};

    // Filter by approval status
    if (req.query.isApproved !== undefined) {
      query.isApproved = req.query.isApproved === 'true';
    }

    // Filter by active status
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }

    // Filter by club
    if (req.query.club) {
      query.club = req.query.club;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    const events = await Event.find(query)
      .populate('club', 'name category')
      .populate('createdBy', 'name email')
      .sort('-eventDate');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get single event
 * @route   GET /api/events/:id
 * @access  Public
 */
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('club', 'name category contactEmail')
      .populate('createdBy', 'name email phone');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Create new event
 * @route   POST /api/events
 * @access  Private/Coordinator, Admin
 */
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      club,
      eventDate,
      eventTime,
      venue,
      category,
      maxParticipants,
      registrationDeadline,
      banner,
      requirements,
    } = req.body;

    // Verify club exists and is approved
    const clubExists = await Club.findById(club);
    if (!clubExists) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    if (!clubExists.isApproved) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create event for unapproved club',
      });
    }

    // Check if user is coordinator of this club (unless admin)
    if (
      req.user.role === 'coordinator' &&
      clubExists.coordinator.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create events for this club',
      });
    }

    const event = await Event.create({
      title,
      description,
      club,
      eventDate,
      eventTime,
      venue,
      category,
      maxParticipants,
      registrationDeadline,
      banner,
      requirements,
      createdBy: req.user.id,
      isApproved: req.user.role === 'admin', // Auto-approve if created by admin
    });

    const populatedEvent = await Event.findById(event._id)
      .populate('club', 'name category')
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: populatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update event
 * @route   PUT /api/events/:id
 * @access  Private/Coordinator (own event), Admin
 */
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id).populate('club');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check ownership
    if (
      req.user.role === 'coordinator' &&
      event.club.coordinator.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event',
      });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('club', 'name category')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete event
 * @route   DELETE /api/events/:id
 * @access  Private/Coordinator (own event), Admin
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('club');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check ownership
    if (
      req.user.role === 'coordinator' &&
      event.club.coordinator.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event',
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Approve event
 * @route   PUT /api/events/:id/approve
 * @access  Private/Admin
 */
exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    )
      .populate('club', 'name category')
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Reject event
 * @route   PUT /api/events/:id/reject
 * @access  Private/Admin
 */
exports.rejectEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      { new: true }
    )
      .populate('club', 'name category')
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
