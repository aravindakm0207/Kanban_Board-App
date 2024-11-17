import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateTask, deleteTask } from "../../redux/actions/taskActions";
const UpdateTask = ({ task, closeDialog }) => {
  const dispatch = useDispatch();

  const [updatedTaskData, setUpdatedTaskData] = useState({
    name: task.name,
    description: task.description,
    dueDate: task.dueDate.split("T")[0], // Keep only the date part
    assignee: task.assignee
      ? task.assignee.firstname + " " + task.assignee.lastname : "", // Handle the assignee as an ID
  });

  const handleDeleteTask = () => dispatch(deleteTask(task._id));

  const handleUpdateTask = () => {
    if (updatedTaskData.name.trim() && updatedTaskData.description.trim()) {
      dispatch(updateTask(task._id, updatedTaskData));
    closeDialog()
    }
  };

  const handleChange = (e) =>
    setUpdatedTaskData({
      ...updatedTaskData,
      [e.target.name]: e.target.value,
    });

  return (
    <Box
      className="task-edit"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
      }}
    >
      <TextField
        value={updatedTaskData.name}
        id="outlined-basic"
        label="Task Name"
        variant="standard"
        name="name"
        onChange={handleChange}
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
      <Button onClick={handleUpdateTask} variant="contained">
        Save
      </Button>
    </Box>
  );
};

export default UpdateTask;
