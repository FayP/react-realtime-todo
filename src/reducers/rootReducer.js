
import { combineReducers } from 'redux';
import todosReducer from './todoReducer';
import { firebaseStateReducer } from 'react-redux-firebase';

export default combineReducers({
  firebase: firebaseStateReducer
});