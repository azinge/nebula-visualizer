/* Actions */
import { BEGIN_STARTUP, END_STARTUP } from './actions';

/* Initial State */
const initialState = {
  loaded: false,
  status: 'dormant',
};

/* Reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_STARTUP:
      return {
        ...state,
        loaded: false,
        status: 'loading',
      };
    case END_STARTUP:
      return {
        ...state,
        loaded: true,
        status: 'ready',
      };
    default:
      return state;
  }
};

export default reducer;
