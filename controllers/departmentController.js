const Department = require('../models/Department');

// @desc    Get all 19 engineering departments
// @route   GET /api/departments
// @access  Public
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single department by short code (e.g. IT, CSE)
// @route   GET /api/departments/:code
// @access  Public
exports.getDepartmentByCode = async (req, res, next) => {
  try {
    const department = await Department.findOne({ code: req.params.code.toUpperCase() });
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.status(200).json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new department (Admin only)
// @route   POST /api/departments
// @access  Private/Admin
exports.createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

// @desc    Update department (Admin only)
// @route   PUT /api/departments/:id
// @access  Private/Admin
exports.updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.status(200).json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete department (Admin only)
// @route   DELETE /api/departments/:id
// @access  Private/Admin
exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.status(200).json({ success: true, message: 'Department deleted' });
  } catch (err) {
    next(err);
  }
};
