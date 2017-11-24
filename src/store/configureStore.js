import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { fbConfig } from '../firebase';

export default () => createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(
      thunk.withExtraArgument(getFirebase)
    ),
    reactReduxFirebase(fbConfig)
  )
);