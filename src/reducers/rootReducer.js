
import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import viewReducer from './viewReducer';

export default combineReducers({
  firebase: firebaseStateReducer,
  viewManager: viewReducer
});