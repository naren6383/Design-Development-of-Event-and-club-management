const Registration = require('../models/Registration');
const Event = require('../models/Event');

/**
 * @desc    Get all registrations
 * @route   GET /api/registrations
 * @access  Private/Admin
 */
exports.getAllRegistrations = async (req, res) => {
  try {
    let query = {};

    // Filter by event
    if (req.query.event) {
      query.event = req.query.event;
    }

    // Filter by student
    if (req.query.student) {
      query.student = req.query.student;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const registrations = await Registration.find(query)
      .populate('event', 'title eventDate venue club')
      .populate('student', 'name email department year rollNumber')
      .populate({
        path: 'event',
        populate: {
          path: 'club',
          select: 'name',
        },
      })
      .sort('-registrationDate');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get single registration
 * @route   GET /api/registrations/:id
 * @access  Private
 */
exports.getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('event')
      .populate('student', 'name email department year rollNumber');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Register for an event
 * @route   POST /api/registrations
 * @access  Private/Student
 */
exports.createRegistration = async (req, res) => {
  try {
    const { event, comments } = req.body;

    // Verify event exists
    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if event is approved and active
    if (!eventExists.isApproved) {
      return res.status(400).json({
        success: false,
        message: 'Cannot register for unapproved event',
      });
    }

    if (!eventExists.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Event is not active',
      });
    }

    // Check registration deadline
    if (new Date() > eventExists.registrationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed',
      });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      event,
      student: req.user.id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event',
      });
    }

    // Check max participants
    const registrationCount = await Registration.countDocuments({
      event,
      status: { $in: ['confirmed', 'attended'] },
    });

    if (registrationCount >= eventExists.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event has reached maximum participants',
      });
    }

    const registration = await Registration.create({
      event,
      student: req.user.id,
      comments,
    });

    const populatedRegistration = await Registration.findById(registration._id)
      .populate('event', 'title eventDate venue')
      .populate('student', 'name email');

    res.status(201).json({
      success: true,
      data: populatedRegistration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get my registrations (for logged in student)
 * @route   GET /api/registrations/my-registrations
 * @access  Private/Student
 */
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user.id })
      .populate({
        path: 'event',
        populate: {
          path: 'club',
          select: 'name',
        },
      })
      .sort('-registrationDate');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get registrations for coordinator's events
 * @route   GET /api/registrations/my-events
 * @access  Private/Coordinator
 */
exports.getMyEventRegistrations = async (req, res) => {
  try {
    // Get all events for coordinator's club
    const events = await Event.find({ createdBy: req.user.id });
    const eventIds = events.map((event) => event._id);

    const registrations = await Registration.find({ event: { $in: eventIds } })
      .populate('event', 'title eventDate venue')
      .populate('student', 'name email department year rollNumber')
      .sort('-registrationDate');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update registration status
 * @route   PUT /api/registrations/:id
 * @access  Private/Coordinator, Admin
 */
exports.updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
      .populate('event', 'title eventDate venue')
      .populate('student', 'name email');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Cancel registration
 * @route   DELETE /api/registrations/:id
 * @access  Private/Student (own registration)
 */
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    // Check ownership
    if (registration.student.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this registration',
      });
    }

    await registration.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Registration cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
