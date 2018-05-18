import { createAction } from '../utils';

/* Actions */
export const RECEIVE_CONSTRUCTS = 'NV.CONSTRUCTS.RECEIVED_DATA';
export const RESET_CONSTRUCTS = 'NV.CONSTRUCTS.RESET_DATA';

/* Action Creators */
export const receiveConstructs = createAction(RECEIVE_CONSTRUCTS);
export const resetConstructs = createAction(RESET_CONSTRUCTS);

/* Thunks */
export const updateConstruct = con => async (dispatch, getState) => {
  const { constructs: { data } } = getState();
  const updatedConstructs = data.map(item => (item.key === con.key ? con : item));
  await dispatch(receiveConstructs(updatedConstructs));
  return updatedConstructs;
};
