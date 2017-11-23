import {createStore, compose} from 'redux';
import rootReducer from '../reducers/rootReducer';
import { reactReduxFirebase } from 'react-redux-firebase';
import { fbConfig } from '../firebase';

const createStoreWithMiddleware = compose(
  reactReduxFirebase(fbConfig, { userProfile: 'users' }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)(createStore)

export default () => createStoreWithMiddleware(rootReducer)