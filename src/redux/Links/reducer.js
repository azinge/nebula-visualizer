/* Actions */
import { RECEIVE_LINKS, RESET_LINKS } from './actions';

/* Initial State */
const initialState = {
  data: [],
};

/* Reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LINKS:
      return {
        ...state,
        data: action.payload,
      };
    case RESET_LINKS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
