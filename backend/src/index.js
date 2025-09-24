const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
require('dotenv').config();

// Import database connection
const connectDB = require('./db');

// Import routes
const taskRoutes = require('../routes/tasks');

// Import middleware
const { errorHandler, notFound } = require('../middleware/errorHandler');

// Load OpenAPI specification
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yml'));

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://zero1-task-manager-to-do-app.netlify.app',
  'https://zero1-task-manager-to-do-app.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Task Manager API Documentation'
  }));
}

// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API',
    version: '1.0.0',
    status: 'running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    documentation: {
      description: 'A RESTful API for managing tasks with validation and error handling',
      baseUrl: `http://localhost:${PORT}`,
      endpoints: {
        tasks: {
          'GET /api/tasks': {
            description: 'List all tasks with optional filtering',
            queryParams: {
              completed: 'boolean - Filter by completion status',
              priority: 'string - Filter by priority (low, medium, high)',
              sortBy: 'string - Sort field (default: createdAt)',
              sortOrder: 'string - Sort order (asc, desc)'
            },
            example: '/api/tasks?completed=false&priority=high&sortBy=dueDate&sortOrder=asc'
          },
          'GET /api/tasks/:id': {
            description: 'Get a single task by ID',
            example: '/api/tasks/507f1f77bcf86cd799439011'
          },
          'POST /api/tasks': {
            description: 'Create a new task',
            requiredFields: ['title'],
            optionalFields: ['description', 'priority', 'dueDate'],
            validation: {
              title: 'Required, 1-200 characters',
              description: 'Optional, max 1000 characters',
              priority: 'Optional, must be: low, medium, high',
              dueDate: 'Optional, must be today or future date (ISO 8601)'
            },
            example: {
              title: 'Complete project',
              description: 'Finish the task manager project',
              priority: 'high',
              dueDate: '2024-12-31'
            }
          },
          'PUT /api/tasks/:id': {
            description: 'Update an existing task',
            fields: 'All fields optional for updates',
            validation: 'Same validation rules as POST',
            example: {
              completed: true,
              priority: 'medium'
            }
          },
          'DELETE /api/tasks/:id': {
            description: 'Delete a task by ID',
            example: '/api/tasks/507f1f77bcf86cd799439011'
          }
        },
        system: {
          'GET /health': {
            description: 'Health check endpoint',
            returns: 'Server status and database connection status'
          },
          'GET /': {
            description: 'API documentation (this endpoint)'
          }
        }
      },
      errorFormat: {
        error: 'Short error message',
        details: {
          message: 'Detailed error description',
          type: 'Error type (ValidationError, NotFoundError, etc.)',
          validationErrors: 'Array of validation errors (if applicable)'
        }
      },
      examples: {
        successResponse: {
          success: true,
          data: { /* task object */ },
          message: 'Operation completed successfully'
        },
        errorResponse: {
          error: 'Validation failed',
          details: {
            message: 'Please check the provided data and try again',
            type: 'ValidationError',
            validationErrors: [
              {
                field: 'title',
                message: 'Title is required',
                value: ''
              }
            ]
          }
        }
      }
    }
  });
});

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

// Start server with database connection
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`🗄️ Database: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
      if (process.env.NODE_ENV !== 'production') {
        console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      }
      console.log(`📋 API Endpoints:`);
      console.log(`   GET    /api/tasks     - List all tasks`);
      console.log(`   GET    /api/tasks/:id  - Get single task`);
      console.log(`   POST   /api/tasks     - Create task`);
      console.log(`   PUT    /api/tasks/:id - Update task`);
      console.log(`   DELETE /api/tasks/:id - Delete task`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the application
startServer();

module.exports = app;
