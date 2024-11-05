import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Section from './Section';
import AddSectionForm from './AddSection';
import { fetchSections } from '../redux/actions/sectionActions';
import { fetchTasks } from '../redux/actions/taskActions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections.sections || []);
  
  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        {sections.map((section) => (
          <Section key={section._id} section={section} />
        ))}
        <AddSectionForm />
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
