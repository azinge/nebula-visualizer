/* Actions */
import { RECEIVE_PROGRAM, RESET_PROGRAM } from './actions';

/* Initial State */
const initialState = {
  data: '',
};

/* Reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PROGRAM:
      return {
        ...state,
        data: action.payload,
      };
    case RESET_PROGRAM:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
