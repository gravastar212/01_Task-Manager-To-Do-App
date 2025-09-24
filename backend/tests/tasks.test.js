const request = require('supertest');
const app = require('./app');
const Task = require('../models/Task');
const mongoose = require('mongoose');

describe('Task API Endpoints', () => {
  let testTask;

  beforeEach(async () => {
    // Create a test task for some tests
    testTask = await Task.create({
      title: 'Test Task',
      description: 'This is a test task',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });
  });

  describe('GET /api/tasks', () => {
    it('should fetch all tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Test Task');
    });

    it('should filter tasks by completion status', async () => {
      // Create a completed task
      await Task.create({
        title: 'Completed Task',
        completed: true
      });

      const response = await request(app)
        .get('/api/tasks?completed=false')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].completed).toBe(false);
    });

    it('should filter tasks by priority', async () => {
      const response = await request(app)
        .get('/api/tasks?priority=high')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].priority).toBe('high');
    });

    it('should sort tasks by creation date', async () => {
      // Create another task
      await Task.create({
        title: 'Second Task',
        priority: 'medium'
      });

      const response = await request(app)
        .get('/api/tasks?sortBy=createdAt&sortOrder=desc')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Second Task'); // Most recent first
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should fetch a single task by ID', async () => {
      const response = await request(app)
        .get(`/api/tasks/${testTask._id}`)
        .expect(200);

      expect(response.body.title).toBe('Test Task');
      expect(response.body.description).toBe('This is a test task');
      expect(response.body.priority).toBe('high');
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/tasks/${fakeId}`)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
      expect(response.body.details.type).toBe('NotFoundError');
    });

    it('should return 404 for invalid ObjectId', async () => {
      const response = await request(app)
        .get('/api/tasks/invalid-id')
        .expect(404);

      expect(response.body.error).toBe('Resource not found');
      expect(response.body.details.type).toBe('CastError');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task with valid data', async () => {
      const taskData = {
        title: 'New Task',
        description: 'A new task description',
        priority: 'medium',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.title).toBe('New Task');
      expect(response.body.description).toBe('A new task description');
      expect(response.body.priority).toBe('medium');
      expect(response.body.completed).toBe(false);
    });

    it('should create a task with only required fields', async () => {
      const taskData = {
        title: 'Minimal Task'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.title).toBe('Minimal Task');
      expect(response.body.priority).toBe('medium'); // Default value
      expect(response.body.completed).toBe(false); // Default value
    });

    it('should fail validation for empty title', async () => {
      const taskData = {
        title: '',
        priority: 'high'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details.validationErrors).toHaveLength(2); // Empty title triggers 2 validations
      expect(response.body.details.validationErrors[0].field).toBe('title');
    });

    it('should fail validation for invalid priority', async () => {
      const taskData = {
        title: 'Valid Title',
        priority: 'invalid-priority'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details.validationErrors).toHaveLength(1);
      expect(response.body.details.validationErrors[0].field).toBe('priority');
    });

    it('should fail validation for past due date', async () => {
      const taskData = {
        title: 'Valid Title',
        dueDate: '2020-01-01'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details.validationErrors).toHaveLength(1);
      expect(response.body.details.validationErrors[0].field).toBe('dueDate');
    });

    it('should fail validation for title too long', async () => {
      const taskData = {
        title: 'A'.repeat(201), // 201 characters
        priority: 'high'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details.validationErrors).toHaveLength(1);
      expect(response.body.details.validationErrors[0].field).toBe('title');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task with valid data', async () => {
      const updateData = {
        title: 'Updated Task',
        completed: true,
        priority: 'low'
      };

      const response = await request(app)
        .put(`/api/tasks/${testTask._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe('Updated Task');
      expect(response.body.completed).toBe(true);
    });

    it('should update only provided fields', async () => {
      const updateData = {
        completed: true
      };

      const response = await request(app)
        .put(`/api/tasks/${testTask._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe('Test Task'); // Unchanged
      expect(response.body.completed).toBe(true); // Updated
      expect(response.body.priority).toBe('high'); // Unchanged
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = {
        title: 'Updated Title'
      };

      const response = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .send(updateData)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
      expect(response.body.details.type).toBe('NotFoundError');
    });

    it('should fail validation for invalid update data', async () => {
      const updateData = {
        title: '', // Empty title
        priority: 'invalid'
      };

      const response = await request(app)
        .put(`/api/tasks/${testTask._id}`)
        .send(updateData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details.validationErrors).toHaveLength(3); // Empty title + invalid priority
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task successfully', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${testTask._id}`)
        .expect(204);

      // Verify task is deleted
      const deletedTask = await Task.findById(testTask._id);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
      expect(response.body.details.type).toBe('NotFoundError');
    });

    it('should return 404 for invalid ObjectId', async () => {
      const response = await request(app)
        .delete('/api/tasks/invalid-id')
        .expect(404);

      expect(response.body.error).toBe('Resource not found');
      expect(response.body.details.type).toBe('CastError');
    });
  });

  describe('API Documentation', () => {
    it('should return API documentation on GET /', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toBe('Task Manager API');
      expect(response.body.version).toBe('1.0.0');
      expect(response.body.status).toBe('running');
      expect(response.body.documentation).toBeDefined();
      expect(response.body.documentation.endpoints).toBeDefined();
    });

    it('should return health check on GET /health', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.time).toBeDefined();
      expect(response.body.database).toBeDefined();
    });
  });
});
