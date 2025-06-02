const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// POST /api/tasks
router.post('/tasks', taskController.createTask);

// GET /api/tasks?child_id=4
router.get('/tasks', taskController.getTasksForChild);

// PUT /api/tasks/:id/complete
router.put('/tasks/:id/complete', taskController.markTaskCompleted);

module.exports = router;
