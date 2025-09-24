// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({
      error: 'Resource not found',
      details: {
        message: `Invalid ID format: ${err.value}`,
        type: 'CastError'
      }
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate field value',
      details: {
        message: 'A resource with this value already exists',
        type: 'DuplicateKeyError',
        field: Object.keys(err.keyPattern)[0]
      }
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const validationErrors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message,
      value: val.value
    }));
    
    return res.status(400).json({
      error: 'Validation failed',
      details: {
        validationErrors,
        message: 'Please check the provided data and try again',
        type: 'ValidationError'
      }
    });
  }

  // Default server error
  res.status(error.statusCode || 500).json({
    error: 'Internal server error',
    details: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Something went wrong on our end' 
        : error.message || 'Server Error',
      type: 'ServerError',
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    details: {
      message: `The requested route ${req.originalUrl} does not exist`,
      type: 'NotFoundError',
      availableRoutes: [
        'GET /',
        'GET /health',
        'GET /api/tasks',
        'GET /api/tasks/:id',
        'POST /api/tasks',
        'PUT /api/tasks/:id',
        'DELETE /api/tasks/:id'
      ]
    }
  });
};

module.exports = {
  errorHandler,
  notFound
};
