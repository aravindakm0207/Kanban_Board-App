import axios from 'axios';
import API_BASE_URL from '../../config';

// Action Types for Tasks
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
export const MOVE_TASK_SUCCESS = 'MOVE_TASK_SUCCESS';
export const MOVE_TASK_FAILURE = 'MOVE_TASK_FAILURE';

// Task Actions
export const fetchTasks = () => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        const response = await axios.get(`${API_BASE_URL}/all-tasks`, { headers });
        console.log('Fetched tasks:', response.data);
        dispatch({ type: FETCH_TASKS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_TASKS_FAILURE, payload: error.response?.data || error.message });
    }
};

export const createTask = (taskData) => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        const response = await axios.post(`${API_BASE_URL}/create-tasks`, taskData, { headers });
        console.log('Task created:', response.data);
        dispatch({ type: CREATE_TASK_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_TASK_FAILURE, payload: error.response?.data || error.message });
    }
};

export const updateTask = (taskId, data) => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        const response = await axios.put(`${API_BASE_URL}/update-task/${taskId}`, data, { headers });
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_TASK_FAILURE, payload: error.response?.data || error.message });
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        await axios.delete(`${API_BASE_URL}/remove-task/${taskId}`, { headers });
        dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
    } catch (error) {
        dispatch({ type: DELETE_TASK_FAILURE, payload: error.response?.data || error.message });
    }
};

export const moveTask = (taskId, newSectionId) => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        const response = await axios.put(`${API_BASE_URL}/move-task/${taskId}`, { newSectionId }, { headers });
        dispatch({ type: MOVE_TASK_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: MOVE_TASK_FAILURE, payload: error.response?.data || error.message });
    }
};
