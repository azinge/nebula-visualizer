import { createAction } from '../utils';

/* Actions */
export const RECEIVE_CONSTRUCTS = 'NV.CONSTRUCTS.RECEIVED_DATA';

/* Action Creators */
export const receiveConstructs = createAction(RECEIVE_CONSTRUCTS);

/* Thunks */
export const updateConstruct = con => async (dispatch, getState) => {
  await dispatch(updateConstruct());
};
