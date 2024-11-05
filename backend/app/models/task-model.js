const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  assignee: String,
  section: { type: mongoose.Schema.Types.ObjectId,
     ref: 'Section' }
});
const Task = model('Task', taskSchema);

module.exports = Task
