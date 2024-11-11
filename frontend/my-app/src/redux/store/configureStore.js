import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; 
import {sectionReducer} from '../reducers/sectionReducer';
import {taskReducer} from '../reducers/taskReducer';

const configureStore = () => {
  const store = createStore(combineReducers({
    sections: sectionReducer,
    tasks: taskReducer,   
 }), applyMiddleware(thunk))
 return store 
}

export default configureStore;
