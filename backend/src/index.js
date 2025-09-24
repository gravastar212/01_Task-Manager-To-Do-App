const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// Import database connection
const connectDB = require('./db');

// Import routes
const taskRoutes = require('../routes/tasks');

// Import middleware
const { errorHandler, notFound } = require('../middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API',
    version: '1.0.0',
    status: 'running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    endpoints: {
      tasks: '/api/tasks',
      health: '/health'
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
