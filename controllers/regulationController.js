const defaultRegulations = [
  {
    code: 'R2021',
    name: 'Regulation 2021 (Outcome Based Education)',
    year: 2021,
    status: 'Active',
    isDefault: true,
    description: 'Anna University R2021 — CBCS Outcome Based Education framework. Fully established curriculum covering all 8 semesters across all departments.',
    deptCount: 59,
    subjectCount: 2303
  },
  {
    code: 'R2025',
    name: 'Regulation 2025 (AI & Emerging Tech Integrated)',
    year: 2025,
    status: 'Active',
    isDefault: false,
    description: 'Anna University R2025 — New curriculum with AI, emerging technology and industry-aligned subjects. Currently covers Sem 1 & 2 for all departments.',
    deptCount: 57,
    subjectCount: 712
  }
];

// @desc    Get all active academic regulations (Strictly R2021 and R2025)
// @route   GET /api/regulations
// @access  Public
exports.getRegulations = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: defaultRegulations.length,
        data: defaultRegulations
      });
    }

    let regulations = await Regulation.find({ code: { $in: ['R2021', 'R2025'] } }).sort({ year: -1 });
    if (!regulations || regulations.length === 0) {
      regulations = defaultRegulations;
    }

    res.status(200).json({
      success: true,
      count: regulations.length,
      data: regulations
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      count: defaultRegulations.length,
      data: defaultRegulations
    });
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
