
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "../redux/actions/sectionActions";
import { fetchTasks } from "../redux/actions/taskActions";
import Section from "./Section/Section";
import AddSection from "./AddSection";
import { Box } from "@mui/material";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections.sections);
  const tasks = useSelector((state) => state.tasks.tasks);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchSections());
    dispatch(fetchTasks());
  }, [dispatch]);

  console.log("Tasks in KanbanBoard render:", tasks);
  console.log("Redux state - sections:", sections);
  console.log("Redux state - tasks:", tasks);
  console.log('Tasks in Component:', tasks); // Check if tasks update when a new task is added
    console.log('Error in Component:', error);

  return (
    <Box
      sx={{
        display: "flex",
        background : 'white',
        overflowX: "auto",
        height : '80vh',
       
      }}
    >
       {console.log("Sections and tasks:", sections)}
        {sections.forEach((section) => {
            console.log(`Section ${section.title} tasks:`, section.tasks);
        })}
      {sections.map((section) => (
        <Section key={section._id} section={section} tasks={tasks} />
      ))}
      <AddSection />
    </Box>
  );
};

export default KanbanBoard;
