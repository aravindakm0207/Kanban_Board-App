import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  MOVE_TASK_SUCCESS,
  MOVE_TASK_FAILURE,
} from '../actions/taskActions';


const initialState = {
  tasks: [],
  error: null,
};

export const taskReducer = (state = initialState, action) => {
  console.log('Current State:', state); 
  console.log('Action Received:', action);

  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.payload };

    case CREATE_TASK_SUCCESS:


      return { ...state, tasks: [...state.tasks, action.payload] };

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
