import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import constructsReducer from './Constructs/reducer';

const persistConfig = {
  storage,
  key: 'root',
  whitelist: [],
};

const appReducer = combineReducers({
  constructs: constructsReducer,
});

export default persistReducer(persistConfig, appReducer);
