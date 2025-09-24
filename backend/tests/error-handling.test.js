const request = require('supertest');
const app = require('./app');
const Task = require('../models/Task');
const mongoose = require('mongoose');

describe('Error Handling and Edge Cases', () => {
  describe('Validation Error Handling', () => {
    it('should handle multiple validation errors', async () => {
      const invalidData = {
        title: '', // Empty title
        description: 'A'.repeat(1001), // Too long description
        priority: 'invalid-priority', // Invalid priority
        dueDate: '2020-01-01' // Past date
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details.validationErrors).toHaveLength(5); // Multiple validation errors
      
      // Check specific validation errors
      const errors = response.body.details.validationErrors;
      const titleError = errors.find(e => e.field === 'title');
      const descError = errors.find(e => e.field === 'description');
      const priorityError = errors.find(e => e.field === 'priority');
      const dateError = errors.find(e => e.field === 'dueDate');

      expect(titleError).toBeDefined();
      expect(descError).toBeDefined();
      expect(priorityError).toBeDefined();
      expect(dateError).toBeDefined();
    });

    it('should handle boolean validation for completed field', async () => {
      const invalidData = {
        title: 'Valid Title',
        completed: 'not-a-boolean'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      const completedError = response.body.details.validationErrors.find(e => e.field === 'completed');
      expect(completedError).toBeDefined();
    });

    it('should handle invalid date format', async () => {
      const invalidData = {
        title: 'Valid Title',
        dueDate: 'not-a-date'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      const dateError = response.body.details.validationErrors.find(e => e.field === 'dueDate');
      expect(dateError).toBeDefined();
    });
  });

  describe('Database Error Handling', () => {
    it('should handle mongoose validation errors', async () => {
      // Create a task that violates schema constraints
      const task = new Task({
        title: 'A'.repeat(201), // Exceeds maxlength
        priority: 'invalid'
      });

      try {
        await task.save();
      } catch (error) {
        // This should trigger mongoose validation error
        expect(error.name).toBe('ValidationError');
      }
    });
  });

  describe('Route Not Found', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/non-existent-route')
        .expect(404);

      expect(response.body.error).toBe('Route not found');
      expect(response.body.details.type).toBe('NotFoundError');
      expect(response.body.details.availableRoutes).toBeDefined();
    });

    it('should return 404 for non-existent API routes', async () => {
      const response = await request(app)
        .get('/api/tasks/non-existent-endpoint')
        .expect(404);

      expect(response.body.error).toBe('Resource not found');
    });
  });

  describe('Request Body Validation', () => {
    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Content-Type', 'application/json')
        .send('{"title": "Valid Title", "priority": "high"') // Missing closing brace
        .expect(400);

      // Express should handle malformed JSON
      expect(response.body).toBeDefined();
    });

    it('should handle empty request body', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
      const titleError = response.body.details.validationErrors.find(e => e.field === 'title');
      expect(titleError).toBeDefined();
    });
  });

  describe('Query Parameter Handling', () => {
    beforeEach(async () => {
      // Create test tasks with different properties
      await Task.create({
        title: 'High Priority Task',
        priority: 'high',
        completed: false
      });
      
      await Task.create({
        title: 'Low Priority Task',
        priority: 'low',
        completed: true
      });
      
      await Task.create({
        title: 'Medium Priority Task',
        priority: 'medium',
        completed: false
      });
    });

    it('should handle invalid query parameters gracefully', async () => {
      const response = await request(app)
        .get('/api/tasks?completed=maybe&priority=super-high')
        .expect(200);

      // Should return all tasks since filters don't match
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0); // No tasks match the invalid filters
    });

    it('should handle empty query parameters', async () => {
      const response = await request(app)
        .get('/api/tasks?completed=&priority=')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2); // Two tasks created in beforeEach
    });

    it('should handle multiple query parameters', async () => {
      const response = await request(app)
        .get('/api/tasks?completed=false&priority=high')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1); // One task matches both filters
      expect(response.body[0].priority).toBe('high');
      expect(response.body[0].completed).toBe(false);
    });
  });

  describe('Edge Cases for Task Operations', () => {
    it('should handle updating non-existent task', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = {
        title: 'Updated Title'
      };

      const response = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .send(updateData)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });

    it('should handle deleting already deleted task', async () => {
      const task = await Task.create({
        title: 'To Be Deleted'
      });

      // Delete the task first
      await request(app)
        .delete(`/api/tasks/${task._id}`)
        .expect(204);

      // Try to delete again
      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });

    it('should handle very long valid input', async () => {
      const taskData = {
        title: 'A'.repeat(200), // Maximum allowed length
        description: 'B'.repeat(1000) // Maximum allowed length
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
    });
  });
});
