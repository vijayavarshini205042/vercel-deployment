const Regulation = require('../models/Regulation');

// @desc    Get all active academic regulations
// @route   GET /api/regulations
// @access  Public
exports.getRegulations = async (req, res, next) => {
  try {
    const regulations = await Regulation.find().sort({ year: -1 });
    res.status(200).json({
      success: true,
      count: regulations.length,
      data: regulations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new regulation (Admin only)
// @route   POST /api/regulations
// @access  Private/Admin
exports.createRegulation = async (req, res, next) => {
  try {
    const regulation = await Regulation.create(req.body);
    res.status(201).json({
      success: true,
      data: regulation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update regulation (Admin only)
// @route   PUT /api/regulations/:id
// @access  Private/Admin
exports.updateRegulation = async (req, res, next) => {
  try {
    const regulation = await Regulation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!regulation) {
      return res.status(404).json({ success: false, message: 'Regulation not found' });
    }
    res.status(200).json({ success: true, data: regulation });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete regulation (Admin only)
// @route   DELETE /api/regulations/:id
// @access  Private/Admin
exports.deleteRegulation = async (req, res, next) => {
  try {
    const regulation = await Regulation.findByIdAndDelete(req.params.id);
    if (!regulation) {
      return res.status(404).json({ success: false, message: 'Regulation not found' });
    }
    res.status(200).json({ success: true, message: 'Regulation deleted successfully' });
  } catch (err) {
    next(err);
  }
};
