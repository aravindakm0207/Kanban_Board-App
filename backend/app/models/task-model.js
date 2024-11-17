const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
    name: String,
    description: String,
    dueDate: Date, // Store the actual date
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
});

// Virtual field to get user-friendly due date
taskSchema.virtual("dueDateText").get(function () {
    const today = new Date();
    const dueDate = new Date(this.dueDate);

    if (dueDate.toDateString() === today.toDateString()) {
        return "today";
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (dueDate.toDateString() === yesterday.toDateString()) {
        return "yesterday";
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (dueDate.toDateString() === tomorrow.toDateString()) {
        return "tomorrow";
    }

    return dueDate.toDateString();
});

const Task = model("Task", taskSchema);
module.exports = Task;
