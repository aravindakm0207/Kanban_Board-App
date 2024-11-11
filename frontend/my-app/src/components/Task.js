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
        assignee: task.assignee
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

    const getDueDateColor = (dueDate) => {
        const currentDate = new Date();
        const taskDueDate = new Date(dueDate);
        return taskDueDate < currentDate ? 'red' : '#007bff'; // Red for overdue, blue for upcoming tasks
    };

    return (
        <div className="task" draggable onDragStart={handleDragStart}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={updatedTaskData.name}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        value={updatedTaskData.description}
                        onChange={handleChange}
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
                    />
                </div>
            ) : (
                <div>
                    <div className="task-header">
                        <h3>{task.name}</h3>
                        <ThreeDotsMenu 
                            onEdit={() => setIsEditing(!isEditing)} 
                            onDelete={handleDeleteTask} 
                        />
                    </div>
                    <p>{task.description}</p>
                    <p style={{ color: getDueDateColor(task.dueDate) }}>
                        {task.dueDate.split("T")[0]} 
                    </p>
                    <p>{task.assignee}</p>
                </div>
            )}

            {isEditing && <button onClick={handleUpdateTask}>Save Changes</button>}
        </div>
    );
};

export default Task;

