import React, { useState } from "react";
import API_BASE_URL from '../config';

import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import UpdateTask from "./UpdateTask/UpdateTask";

import Avatar from "@mui/material/Avatar";

const Task = ({ task, section }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task._id);
    e.dataTransfer.setData("currentSectionId", section);
  };

  // Helper function to format the due date label
  const getDueDateLabel = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDifference = taskDueDate - currentDate;

    const dayInMs = 24 * 60 * 60 * 1000; // Milliseconds in one day
    const differenceInDays = Math.round(timeDifference / dayInMs);

    if (differenceInDays === 0) return "Today";
    if (differenceInDays === 1) return "Tomorrow";
    if (differenceInDays === -1) return "Yesterday";
    return taskDueDate.toLocaleDateString();
  };

  const getDueDateColor = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < currentDate ? "red" : "#007bff"; // Red for overdue, blue for upcoming tasks
  };

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "5px",
        padding: "10px",
        cursor: "pointer",
      }}
      className="task-card"
      draggable
      onDragStart={handleDragStart}
    >
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <UpdateTask task={task} closeDialog={() => setIsEditing(false)} />
      </Dialog>

      <div className="task-view">
        {/* Task Header: Description and Three Dots */}
        <Box className="task-header">
          <h3 className="task-name">{task.name}</h3>
          <Box
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              paddingX: 0,
              cursor: "pointer",
            }}
          >
            <MoreVertIcon />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setIsEditing(true);
                setAnchorEl(false);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </Box>

        {/* Task Footer: Assignee, Due Date, Task Name */}
        <Box
          sx={{
            display: "flex",
            marginTop: "10px",
            gap: "10px",
            alignItems: "center",
            justifyContent : 'space-between'
          }}
        >
          <Box sx={{ 
            display : 'flex',
            alignItems : 'center',
            gap : '5px'
          }}>
            <Avatar
              alt={task.assignee.firstname}
              src={`${API_BASE_URL}${task.assignee.profilePic}`}
              sx={{
                width: 20,   // Adjust the size as per your requirement
                height: 20,  // Adjust the size as per your requirement
              }}
            />
            <p style={{ color: getDueDateColor(task.dueDate) }}>
              {getDueDateLabel(task.dueDate)}
            </p>
          </Box>

          <Box
            sx={{
              background: "#e5e5e5",
              padding: "5px",
              borderRadius: "20px",
            }}
          >
            Design
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Task;
