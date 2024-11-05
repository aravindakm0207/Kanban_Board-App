const initialTaskState = {
  tasks: [],
  error: null,
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, tasks: action.payload, error: null };
    case 'FETCH_TASKS_FAILURE':
    case 'ADD_TASK_FAILURE':
    case 'UPDATE_TASK_FAILURE':
    case 'DELETE_TASK_FAILURE':
    case 'MOVE_TASK_FAILURE':
      return { ...state, error: action.payload };
    case 'ADD_TASK_SUCCESS':
      return { ...state, tasks: [...state.tasks, action.payload], error: null };
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        error: null,
      };
    case 'MOVE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, section: action.payload.section } 
            : task
        ),
        error: null,
      };
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};

export default taskReducer;
