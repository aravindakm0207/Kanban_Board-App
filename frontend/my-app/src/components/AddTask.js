import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/actions/taskActions';

const AddTask = ({ sectionId }) => {
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        dueDate: '',
        assignee: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTask({ ...taskData, section: sectionId }));
        setTaskData({ name: '', description: '', dueDate: '', assignee: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="add-task">
            <input
                type="text"
                name="name"
                value={taskData.name}
                onChange={handleChange}
                placeholder="Task Name"
            />
            <input
                type="text"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Task Description"
            />
            <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
            />
            <input
                type="text"
                name="assignee"
                value={taskData.assignee}
                onChange={handleChange}
                placeholder="Assignee"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
