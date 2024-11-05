import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';

const AddTaskForm = ({ sectionId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { name, description, dueDate, assignee, section: sectionId };
    try {
      await dispatch(addTask(taskData)); 
      setName('');
      setDescription('');
      setDueDate('');
      setAssignee('');
      setError('');
    } catch (err) {
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Assignee" 
        value={assignee} 
        onChange={(e) => setAssignee(e.target.value)} 
        required 
      />
      <button type="submit">Add Task</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </form>
  );
};

export default AddTaskForm;
