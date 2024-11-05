import React, { useState, useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, moveTask } from '../redux/actions/taskActions';
import { fetchSections } from '../redux/actions/sectionActions';
import Task from './Task';
import AddTaskForm from './AddTask';

const Section = ({ section }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchTasks());
  }, [dispatch]);


  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.section === section._id);
  }, [tasks, section._id]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      if (item.currentSectionId !== section._id) {
        dispatch(moveTask(item.taskId, section._id));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`section ${isOver ? 'highlight' : ''}`}>
      <div className="section-header">
        <h2>{section.title}</h2>
        <button onClick={() => setShowAddTask(!showAddTask)}>+</button>
      </div>
      {showAddTask && <AddTaskForm sectionId={section._id} />}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Task key={task._id} task={task} currentSectionId={section._id} />
          ))
        ) : (
          <p>No tasks available. Use the “+” icon to add a new task.</p>
        )}
      </div>
    </div>
  );
};

export default Section;
