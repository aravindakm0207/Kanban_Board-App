import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSection, updateSection } from '../redux/actions/sectionActions';
import { moveTask } from '../redux/actions/taskActions';
import Task from './Task';
import AddTaskForm from './AddTask';
import ThreeDotsMenu from './ThreeDotsMenu';

const Section = ({ section, tasks = [] }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(section.title);
    const [isAddTaskFormVisible, setIsAddTaskFormVisible] = useState(false);

    const handleDeleteSection = () => dispatch(deleteSection(section._id));

    const handleUpdateSection = () => {
        if (newTitle.trim()) {
            dispatch(updateSection(section._id, newTitle));
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setNewTitle(section.title); // Revert title to original
        setIsEditing(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        const currentSectionId = e.dataTransfer.getData('currentSectionId');
        if (currentSectionId !== section._id) {
            dispatch(moveTask(taskId, section._id));
        }
    };

    const sectionTasks = tasks.filter(task => task.section && task.section._id === section._id);

    return (
        <div className="section" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <div className="section-header">
                {isEditing ? (
                    <div className="section-header-edit">
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            autoFocus
                        />
                        <div className="section-header-edit-buttons">
                            <button className="save-button" onClick={handleUpdateSection}>Save</button>
                            <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <h2>{section.title}</h2>
                )}

               
                <div className="buttons">
                   
                    <button onClick={() => setIsAddTaskFormVisible(!isAddTaskFormVisible)} className="add-button">
                        {isAddTaskFormVisible ? 'Cancel' : '+'}
                    </button>

                    
                    <ThreeDotsMenu 
                        onEdit={() => setIsEditing(!isEditing)} 
                        onDelete={handleDeleteSection} 
                    />
                </div>
            </div>

            
            {isAddTaskFormVisible && <AddTaskForm sectionId={section._id} />}

            <div className="tasks">
                {sectionTasks.length > 0 ? (
                    sectionTasks.map((task) => (
                        <Task key={task._id} task={task} section={section._id} />
                    ))
                ) : (
                    <p>No tasks available in this section. Please add one.</p>
                )}
            </div>
        </div>
    );
};

export default Section;


