import { createAction } from '../utils';

/* Actions */
export const RECEIVE_LINKS = 'NV.LINKS.RECEIVED_DATA';
export const RESET_LINKS = 'NV.LINKS.RESET_DATA';

/* Action Creators */
export const receiveLinks = createAction(RECEIVE_LINKS);
export const resetLinks = createAction(RESET_LINKS);

/* Thunks */
