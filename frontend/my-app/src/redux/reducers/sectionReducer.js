const initialSectionState = {
  sections: [],
  error: null,
};

const sectionReducer = (state = initialSectionState, action) => {
  switch (action.type) {
    case 'FETCH_SECTIONS_SUCCESS':
      return { ...state, sections: action.payload, error: null };
    case 'FETCH_SECTIONS_FAILURE':
    case 'ADD_SECTION_FAILURE':
    case 'UPDATE_SECTION_FAILURE':
    case 'DELETE_SECTION_FAILURE':
      return { ...state, error: action.payload };
    case 'ADD_SECTION_SUCCESS':
      return { ...state, sections: [...state.sections, action.payload], error: null };
    case 'UPDATE_SECTION_SUCCESS':
      return {
        ...state,
        sections: state.sections.map((section) =>
          section._id === action.payload._id ? action.payload : section
        ),
        error: null,
      };
    case 'DELETE_SECTION_SUCCESS':
      return {
        ...state,
        sections: state.sections.filter((section) => section._id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};

export default sectionReducer;
