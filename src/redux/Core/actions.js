import { createAction } from '../utils';

/* Actions */
export const BEGIN_STARTUP = 'NV.CORE.BEGIN_STARTUP';
export const END_STARTUP = 'NV.CORE.END_STARTUP';

/* Action Creators */
export const beginStartup = createAction(BEGIN_STARTUP);
export const endStartup = createAction(END_STARTUP);

/* Thunks */
export const startup = () => async dispatch => {
  await dispatch(beginStartup());

  await dispatch(endStartup());
};
