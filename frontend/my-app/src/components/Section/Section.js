import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  // deleteSection,
  updateSection,
} from "../../redux/actions/sectionActions";
import { moveTask } from "../../redux/actions/taskActions";
import Task from "../Task";
import AddTaskForm from "../AddTask";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Dialog from "@mui/material/Dialog";
import "./section.styles.css";
import { Box, Button, Card } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Section = ({ section, tasks = [] }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(section.title);
  const [isAddTaskFormVisible, setIsAddTaskFormVisible] = useState(false);

  // const handleDeleteSection = () => dispatch(deleteSection(section._id));

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
    const taskId = e.dataTransfer.getData("taskId");
    const currentSectionId = e.dataTransfer.getData("currentSectionId");
    if (currentSectionId !== section._id) {
      dispatch(moveTask(taskId, section._id));
    }
  };

  const sectionTasks = tasks.filter(
    (task) => task.section && task.section._id === section._id
  );

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className="section"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box className="section-header" sx={{ marginBottom: "20px" }}>
        {isEditing ? (
          <div className="section-header-edit">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className="section-header-edit-buttons">
              <button className="save-button" onClick={handleUpdateSection}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h2>{section.title}</h2>
        )}
        <Box className="section-menu" sx={{}}>
          <div
            onClick={() => setIsAddTaskFormVisible(!isAddTaskFormVisible)}
            className="add-button"
          >
            <AddCircleIcon />
          </div>

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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>

          {/* <ThreeDotsMenu
            onEdit={() => setIsEditing(!isEditing)}
            onDelete={handleDeleteSection}
          /> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "10px",
          gap: "20px",
          height: "fit-content",
          background: "#f4f5f7",
          borderRadius: "10px",
        }}
      >
        {sectionTasks.length > 0 ? (
          sectionTasks.map((task) => (
            <Task key={task._id} task={task} section={section._id} />
          ))
        ) : (
          <Button
            variant="contained"
            onClick={() => setIsAddTaskFormVisible(true)}
          >
            Add Tasks
          </Button>
        )}
      </Box>

      <Dialog
        open={isAddTaskFormVisible}
        onClose={() => setIsAddTaskFormVisible(false)}
      >
        <AddTaskForm
          closeDialog={() => setIsAddTaskFormVisible(false)}
          sectionId={section._id}
        />
      </Dialog>
    </Box>
  );
};

export default Section;
