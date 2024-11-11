import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../redux/actions/sectionActions';
import { fetchTasks } from '../redux/actions/taskActions'; 
import Section from './Section';
import AddSection from './AddSection';


const KanbanBoard = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.sections.sections);
    const tasks = useSelector((state) => state.tasks.tasks);
    //const error = useSelector((state) => state.sections.error);

    useEffect(() => {
        dispatch(fetchSections());
        dispatch(fetchTasks());
     
    }, [dispatch]);

    console.log('Tasks in KanbanBoard render:', tasks); 
    console.log('Redux state - sections:', sections);
    console.log('Redux state - tasks:', tasks);

    return (
        <div className="kanban-board">
            {sections.map((section) => (
          <Section key={section._id} section={section} tasks={tasks} />
        ))}
        <AddSection />
      </div>
    );
};

export default KanbanBoard;
