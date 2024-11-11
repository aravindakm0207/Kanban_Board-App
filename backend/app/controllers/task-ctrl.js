const Task = require('../models/task-model');
const Section = require('../models/section-model');
const taskCtrl = {};

taskCtrl.create = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        await Section.findByIdAndUpdate(req.body.section, {
            $push: { tasks: task._id }
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

taskCtrl.remove = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await Section.findByIdAndUpdate(task.section, {
            $pull: { tasks: taskId }
        });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};

taskCtrl.update = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
};

taskCtrl.single = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
};

taskCtrl.list = async (req, res) => {
    try {
        const tasks = await Task.find().populate('section'); // Populate the section field
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error listing tasks' });
    }
};

taskCtrl.moveTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { newSectionId } = req.body;
        const currentTask = await Task.findById(taskId);
        if (!currentTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const oldSectionId = currentTask.section;

        currentTask.section = newSectionId; // Change the section of the task
        await currentTask.save();
        await Section.findByIdAndUpdate(oldSectionId, {
            $pull: { tasks: taskId }
        });
        await Section.findByIdAndUpdate(newSectionId, {
            $push: { tasks: taskId }
        });

        res.status(200).json(currentTask);
    } catch (error) {
        res.status(500).json({ error: 'Error moving task' });
    }
};

module.exports = taskCtrl;
