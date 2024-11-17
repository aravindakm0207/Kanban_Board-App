const Task = require('../models/task-model');
const Section = require('../models/section-model');
const User = require('../models/user-model');  // Assuming you're using a User model for assignee
const taskCtrl = {};

// Create a new task
taskCtrl.create = async (req, res) => {
    try {
        const { name, description, dueDate, assignee, section } = req.body;
        
        if (!name || !description || !assignee) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let parsedDate;
        const today = new Date();
        if (dueDate === 'yesterday') {
            parsedDate = new Date(today);
            parsedDate.setDate(today.getDate() - 1);
        } else if (dueDate === 'today') {
            parsedDate = today;
        } else if (dueDate === 'tomorrow') {
            parsedDate = new Date(today);
            parsedDate.setDate(today.getDate() + 1);
        } else {
            parsedDate = new Date(dueDate);
            if (isNaN(parsedDate)) {
                return res.status(400).json({ error: 'Invalid due date' });
            }
        }

        // Find the assignee by email or name (assuming you are looking up by email)
        const user = await User.findOne({ email: assignee });
        if (!user) {
            return res.status(400).json({ error: 'Assignee not found' });
        }

        // Create the task with the assignee's ID
        const task = new Task({ 
            name, 
            description, 
            dueDate: parsedDate, 
            assignee: user._id, // Use user._id for assignee
            section 
        });
        await task.save();

        // Optionally, if a section is provided, update it with the new task
        if (section) {
            await Section.findByIdAndUpdate(section, { $push: { tasks: task._id } });
        }

        res.status(201).json(task);
    } catch (error) {
        console.error(error); // Log the full error for debugging
        res.status(500).json({ error: 'Error creating task', details: error.message });
    }
};

// Remove a task
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

// Update a task
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

// Get a single task by ID
taskCtrl.single = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId)
            .populate('assignee', 'firstname lastname profilePic'); // Populate assignee details
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
};

// List all tasks
taskCtrl.list = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('section')
            .populate('assignee', 'firstname lastname profilePic') // Populate assignee with necessary details
            .lean(); // Use lean() for plain JavaScript objects

        // Add dueDateText to each task (from the virtual field)
        tasks.forEach(task => {
            task.dueDateText = task.dueDateText;  // This utilizes the virtual field from the model
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error listing tasks' });
    }
};

// Move a task to a different section
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
