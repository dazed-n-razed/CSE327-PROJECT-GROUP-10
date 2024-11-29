// middleware/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
  console.error(err);  // Log the error details for debugging

  // Check for known errors and handle them
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      details: err.errors,  // Return validation errors (if any)
    });
  }

  // Check if the error is related to multer (e.g., file size limit exceeded)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: 'File upload error',
      error: err.message,
    });
  }

  // General error handler
  return res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'An unknown error occurred',
  });
};

module.exports = errorMiddleware;
