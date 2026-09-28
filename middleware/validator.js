const { body, validationResult } = require('express-validator');

// Validation error handler middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};

// Validation rules
const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
    .escape(),
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['student', 'faculty', 'admin']).withMessage('Role must be student, faculty, or admin'),
  validateRequest
];

const loginRules = [
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validateRequest
];

const noteRules = [
  body('title').trim().notEmpty().withMessage('Title is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('deptCode').trim().notEmpty().withMessage('Department code is required').toUpperCase(),
  body('regCode').trim().notEmpty().withMessage('Regulation code is required').toUpperCase(),
  body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
  body('unit').isInt({ min: 1, max: 5 }).withMessage('Unit must be between 1 and 5'),
  validateRequest
];

module.exports = {
  registerRules,
  loginRules,
  noteRules,
  validateRequest
};
