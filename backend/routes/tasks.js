const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { validateTask, validateTaskUpdate, handleValidationErrors } = require('../middleware/validation');

// GET /api/tasks - List all tasks
router.get('/', getAllTasks);

// GET /api/tasks/:id - Get single task
router.get('/:id', getTask);

// POST /api/tasks - Create new task
router.post('/', validateTask, handleValidationErrors, createTask);

// PUT /api/tasks/:id - Update task
router.put('/:id', validateTaskUpdate, handleValidationErrors, updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', deleteTask);

module.exports = router;
