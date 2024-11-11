import {
  FETCH_SECTIONS_SUCCESS,
  FETCH_SECTIONS_FAILURE,
  CREATE_SECTION_SUCCESS,
  CREATE_SECTION_FAILURE,
  UPDATE_SECTION_SUCCESS,
  UPDATE_SECTION_FAILURE,
  DELETE_SECTION_SUCCESS,
  DELETE_SECTION_FAILURE,
} from '../actions/sectionActions';

const initialState = {
  sections: [],
  error: null,
};

export const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECTIONS_SUCCESS:
      return { ...state, sections: action.payload };
    case CREATE_SECTION_SUCCESS:
      return { ...state, sections: [...state.sections, action.payload] };
    case UPDATE_SECTION_SUCCESS:
      return {
        ...state,
        sections: state.sections.map((section) =>
          section._id === action.payload._id ? action.payload : section
        ),
      };
    case DELETE_SECTION_SUCCESS:
      return {
        ...state,
        sections: state.sections.filter((section) => section._id !== action.payload),
      };
    case FETCH_SECTIONS_FAILURE:
    case CREATE_SECTION_FAILURE:
    case UPDATE_SECTION_FAILURE:
    case DELETE_SECTION_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
