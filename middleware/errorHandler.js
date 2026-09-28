/**
 * Central Error Handling Middleware
 * Prevents leaking technical stack traces to clients while logging safely.
 */

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for server observability
  console.error(`[Error] ${req.method} ${req.originalUrl} - ${err.message}`);

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with specified ID.`;
    return res.status(404).json({ success: false, message });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value entered for ${field}. Please use another value.`;
    return res.status(400).json({ success: false, message });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({ success: false, message });
  }

  // Multer File Upload Errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size exceeds allowed limit (Maximum 15MB).'
    });
  }

  // Generic production response
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error. Please contact administrator.'
  });
};

module.exports = errorHandler;
