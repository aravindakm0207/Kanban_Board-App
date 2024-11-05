const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const sectionSchema = new mongoose.Schema({
  title: String, 
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task'
    }]
});

const Section = model('Section', sectionSchema)
module.exports =Section
