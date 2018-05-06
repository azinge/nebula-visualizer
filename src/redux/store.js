import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './Root/reducer';

// eslint-disable-next-line no-unused-vars
const postRehydrate = store => () => {};

export default function configureStore() {
  const store = createStore(reducer, {}, applyMiddleware(thunk, logger));
  const persistor = persistStore(store, null, postRehydrate(store));
  return { store, persistor };
}
