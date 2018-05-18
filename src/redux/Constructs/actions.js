import { createAction } from '../utils';

/* Actions */
export const RECEIVE_CONSTRUCTS = 'NV.CONSTRUCTS.RECEIVED_DATA';
export const RECEIVE_CONSTRUCT_MAP = 'NV.CONSTRUCTS.RECEIVED_MAP';
export const RESET_CONSTRUCTS = 'NV.CONSTRUCTS.RESET_DATA';

/* Action Creators */
export const receiveConstructs = createAction(RECEIVE_CONSTRUCTS);
export const receiveConstructMap = createAction(RECEIVE_CONSTRUCT_MAP);
export const resetConstructs = createAction(RESET_CONSTRUCTS);

/* Thunks */
export const updateConstruct = con => async (dispatch, getState) => {
  const { constructs: { map: constructMap } } = getState();
  const updatedConstructMap = { ...constructMap, [con.id]: con };
  await dispatch(receiveConstructMap(updatedConstructMap));
  return updatedConstructMap;
};
