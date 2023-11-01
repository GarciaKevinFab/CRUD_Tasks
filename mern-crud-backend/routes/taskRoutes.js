import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Get a specific task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Update a task by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).send({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if (!deletedTask) return res.status(404).send({ message: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
