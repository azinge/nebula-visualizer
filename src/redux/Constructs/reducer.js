/* Actions */
import { RECEIVE_CONSTRUCTS, RECEIVE_CONSTRUCT_MAP, RESET_CONSTRUCTS } from './actions';

/* Initial State */
const initialState = {
  data: [],
  map: {},
};

/* Reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CONSTRUCTS:
      return {
        ...state,
        data: action.payload,
      };
    case RECEIVE_CONSTRUCT_MAP:
      return {
        ...state,
        map: action.payload,
      };
    case RESET_CONSTRUCTS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
