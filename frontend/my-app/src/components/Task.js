import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/actions/taskActions';
import ThreeDotsMenu from './ThreeDotsMenu';

const Task = ({ task, section }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTaskData, setUpdatedTaskData] = useState({
        name: task.name,
        description: task.description,
        dueDate: task.dueDate.split("T")[0], // Keep only the date part
        assignee: task.assignee ? task.assignee._id : '' // Handle the assignee as an ID
    });

    const dispatch = useDispatch();

    const handleDeleteTask = () => dispatch(deleteTask(task._id));
    const handleUpdateTask = () => {
        if (updatedTaskData.name.trim() && updatedTaskData.description.trim()) {
            dispatch(updateTask(task._id, updatedTaskData));
            setIsEditing(false);
        }
    };

    const handleChange = (e) => setUpdatedTaskData({
        ...updatedTaskData,
        [e.target.name]: e.target.value
    });

    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', task._id);
        e.dataTransfer.setData('currentSectionId', section);
    };

    // Helper function to format the due date label
    const getDueDateLabel = (dueDate) => {
        const currentDate = new Date();
        const taskDueDate = new Date(dueDate);
        const timeDifference = taskDueDate - currentDate;

        const dayInMs = 24 * 60 * 60 * 1000; // Milliseconds in one day
        const differenceInDays = Math.round(timeDifference / dayInMs);

        if (differenceInDays === 0) return 'Today';
        if (differenceInDays === 1) return 'Tomorrow';
        if (differenceInDays === -1) return 'Yesterday';
        return taskDueDate.toLocaleDateString();
    };

    const getDueDateColor = (dueDate) => {
        const currentDate = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate < currentDate ? 'red' : '#007bff'; // Red for overdue, blue for upcoming tasks
    };

    return (
        <div className="task-card" draggable onDragStart={handleDragStart}>
    {isEditing ? (
        <div className="task-edit">
            <input
                type="text"
                name="name"
                value={updatedTaskData.name}
                onChange={handleChange}
                placeholder="Task Name"
            />
            <input
                name="description"
                value={updatedTaskData.description}
                onChange={handleChange}
                placeholder="Task Description"
            />
            <input
                type="date"
                name="dueDate"
                value={updatedTaskData.dueDate}
                onChange={handleChange}
            />
            <input
                type="text"
                name="assignee"
                value={updatedTaskData.assignee}
                onChange={handleChange}
                placeholder="Assignee"
            />
            <button onClick={handleUpdateTask}>Save</button>
        </div>
    ) : (
        <div className="task-view">
            {/* Task Header: Description and Three Dots */}
            <div className="task-header">
                <p className="task-description">{task.description}</p>
                <ThreeDotsMenu 
                    onEdit={() => setIsEditing(!isEditing)} 
                    onDelete={handleDeleteTask} 
                />
            </div>
            {/* Task Footer: Assignee, Due Date, Task Name */}
            <div className="task-footer">
                <img
                    src={
                        task.assignee?.profilePic
                            ? `http://localhost:5000${task.assignee.profilePic}`
                            : '/placeholder.jpg'
                    }
                    alt="Profile"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                    className="assignee-pic"
                />
                <p style={{ color: getDueDateColor(task.dueDate) }}>
                    {getDueDateLabel(task.dueDate)}
                </p>
                <h3 className="task-name">{task.name}</h3>
            </div>
        </div>
    )}
</div>

    );
};

export default Task;
