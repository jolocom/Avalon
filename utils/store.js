import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';

const enhancers = compose(
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
    ? window.devToolsExtension && window.devToolsExtension()
    : f => f
);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default initialState =>
  createStoreWithMiddleware(rootReducer, initialState, enhancers);
