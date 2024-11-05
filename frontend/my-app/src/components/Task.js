import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions/taskActions';

const Task = ({ task, currentSectionId }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { taskId: task._id, currentSectionId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <div ref={drag} className={`task-card ${isDragging ? 'dragging' : ''}`}>
      <div className="task-header">
        <h4>{task.name}</h4>
        <button onClick={handleDelete}>⋮</button>
      </div>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Assignee: {task.assignee}</p>
    </div>
  );
};

export default Task;
