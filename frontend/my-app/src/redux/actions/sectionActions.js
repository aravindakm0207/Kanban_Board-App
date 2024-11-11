import axios from 'axios';
import API_BASE_URL from '../../config'; // Make sure this imports the correct base URL

// Action Types for Sections
export const FETCH_SECTIONS_SUCCESS = 'FETCH_SECTIONS_SUCCESS';
export const FETCH_SECTIONS_FAILURE = 'FETCH_SECTIONS_FAILURE';
export const CREATE_SECTION_SUCCESS = 'CREATE_SECTION_SUCCESS';
export const CREATE_SECTION_FAILURE = 'CREATE_SECTION_FAILURE';
export const UPDATE_SECTION_SUCCESS = 'UPDATE_SECTION_SUCCESS';
export const UPDATE_SECTION_FAILURE = 'UPDATE_SECTION_FAILURE';
export const DELETE_SECTION_SUCCESS = 'DELETE_SECTION_SUCCESS';
export const DELETE_SECTION_FAILURE = 'DELETE_SECTION_FAILURE';

// Section Actions
export const fetchSections = () => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        const response = await axios.get(`${API_BASE_URL}/all-sections`, { headers });
        console.log('Fetched sections:', response.data);
        dispatch({ type: FETCH_SECTIONS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_SECTIONS_FAILURE, payload: error.response?.data || error.message });
    }
};

export const createSection = (title) => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        const response = await axios.post(`${API_BASE_URL}/create-section`, { title }, { headers });
        dispatch({ type: CREATE_SECTION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_SECTION_FAILURE, payload: error.response?.data || error.message });
    }
};

export const updateSection = (sectionId, data) => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        const response = await axios.put(`${API_BASE_URL}/update-section/${sectionId}`, data, { headers });
        dispatch({ type: UPDATE_SECTION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_SECTION_FAILURE, payload: error.response?.data || error.message });
    }
};

export const deleteSection = (sectionId) => async (dispatch) => {
    try {
        const headers = { Authorization: localStorage.getItem('token') };
        await axios.delete(`${API_BASE_URL}/removing-section/${sectionId}`, { headers });
        dispatch({ type: DELETE_SECTION_SUCCESS, payload: sectionId });
    } catch (error) {
        dispatch({ type: DELETE_SECTION_FAILURE, payload: error.response?.data || error.message });
    }
};
