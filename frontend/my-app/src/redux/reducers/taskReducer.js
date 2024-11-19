const initialState = {
  tasks: [],
  sections: [], // Ensure sections exist in initial state
  error: null,
};

export const taskReducer = (state = initialState, action) => {
  console.log('Current State:', state); 
  console.log('Action Received:', action);

  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return { 
        ...state, 
        tasks: action.payload.tasks, 
        sections: action.payload.sections || [] 
      };

    case CREATE_TASK_SUCCESS:
      console.log('Task added to section:', action.payload.section);

      const updatedSections = (state.sections || []).map((section) =>
        section._id === action.payload.section
          ? { 
              ...section, 
              tasks: [...(section.tasks || []), action.payload] 
            }
          : section
      );

      console.log('Updated Sections:', updatedSections);
      return { ...state, sections: updatedSections };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };

    case FETCH_TASKS_FAILURE:
    case CREATE_TASK_FAILURE:
    case UPDATE_TASK_FAILURE:
    case DELETE_TASK_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
