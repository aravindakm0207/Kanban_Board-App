import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; 
import sectionReducer from '../reducers/sectionReducer';
import taskReducer from '../reducers/taskReducer';

const rootReducer = combineReducers({
  sections: sectionReducer,
  tasks: taskReducer,
});

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default configureStore;
