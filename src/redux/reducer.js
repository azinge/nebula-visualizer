import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import coreReducer from './Core/reducer';
import constructsReducer from './Constructs/reducer';
import linksReducer from './Links/reducer';
import programReducer from './Program/reducer';

const persistConfig = {
  storage,
  key: 'root',
  whitelist: [],
};

const appReducer = combineReducers({
  core: coreReducer,
  constructs: constructsReducer,
  links: linksReducer,
  program: programReducer,
});

export default persistReducer(persistConfig, appReducer);
