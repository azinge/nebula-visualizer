/* Actions */
import { RECEIVE_PROGRAM, RESET_PROGRAM, RECEIVE_PARAMS, RESET_PARAMS } from './actions';

/* Initial State */
const initialState = {
  data: '',
  params: '',
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
      return {
        ...state,
        data: '',
      };
    case RECEIVE_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    case RESET_PARAMS:
      return {
        ...state,
        params: '',
      };
    default:
      return state;
  }
};

export default reducer;
