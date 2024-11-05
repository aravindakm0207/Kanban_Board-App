import axios from 'axios';
import API_BASE_URL from '../../config';


export const FETCH_SECTIONS_SUCCESS = 'FETCH_SECTIONS_SUCCESS';
export const FETCH_SECTIONS_FAILURE = 'FETCH_SECTIONS_FAILURE';
export const ADD_SECTION_SUCCESS = 'ADD_SECTION_SUCCESS';
export const ADD_SECTION_FAILURE = 'ADD_SECTION_FAILURE';
export const UPDATE_SECTION_SUCCESS = 'UPDATE_SECTION_SUCCESS';
export const UPDATE_SECTION_FAILURE = 'UPDATE_SECTION_FAILURE';
export const DELETE_SECTION_SUCCESS = 'DELETE_SECTION_SUCCESS';
export const DELETE_SECTION_FAILURE = 'DELETE_SECTION_FAILURE';


export const fetchSections = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/all-sections`, {
      headers: { Authorization: token },
    });
    dispatch({ type: FETCH_SECTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SECTIONS_FAILURE, payload: error.message });
  }
};


export const addSection = (title) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-section`,
      { title },
      { headers: { Authorization: token } }
    );
    dispatch({ type: ADD_SECTION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_SECTION_FAILURE, payload: error.message });
  }
};


export const updateSection = (sectionId, updatedData) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-section/${sectionId}`,
      updatedData,
      { headers: { Authorization: token } }
    );
    dispatch({ type: UPDATE_SECTION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_SECTION_FAILURE, payload: error.message });
  }
};


export const deleteSection = (sectionId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_BASE_URL}/removing-section/${sectionId}`, {
      headers: { Authorization: token },
    });
    dispatch({ type: DELETE_SECTION_SUCCESS, payload: sectionId });
  } catch (error) {
    dispatch({ type: DELETE_SECTION_FAILURE, payload: error.message });
  }
};
