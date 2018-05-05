import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  storage,
  key: 'root',
  whitelist: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
