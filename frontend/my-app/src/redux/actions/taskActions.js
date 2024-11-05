import axios from 'axios';
import API_BASE_URL from '../../config';


export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
export const MOVE_TASK_SUCCESS = 'MOVE_TASK_SUCCESS';
export const MOVE_TASK_FAILURE = 'MOVE_TASK_FAILURE';


export const fetchTasks = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/all-tasks`, {
      headers: { Authorization: token },
    });
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error.message });
  }
};

export const addTask = (taskData) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_BASE_URL}/create-tasks`, taskData, {
      headers: { Authorization: token },
    });
    dispatch({ type: ADD_TASK_SUCCESS, payload: response.data }); 
  } catch (error) {
    dispatch({ type: ADD_TASK_FAILURE, payload: error.message });
  }
};



export const updateTask = (taskId, updatedData) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-task/${taskId}`,
      updatedData,
      { headers: { Authorization: token } }
    );
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_TASK_FAILURE, payload: error.message });
  }
};


export const moveTask = (taskId, targetSectionId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `${API_BASE_URL}/move-task/${taskId}`,
      { sectionId: targetSectionId }, 
      { headers: { Authorization: token } }
    );
    dispatch({ type: MOVE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: MOVE_TASK_FAILURE, payload: error.message });
  }
};


export const deleteTask = (taskId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_BASE_URL}/remove-task/${taskId}`, {
      headers: { Authorization: token },
    });
    dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
  } catch (error) {
    dispatch({ type: DELETE_TASK_FAILURE, payload: error.message });
  }
};
