import { createAction } from '../utils';
import examples from '../../lib/utils/nebula/examples';
import {
  receiveProgram,
  executeProgram,
  refreshViewport,
  refreshProgram,
} from '../Program/actions';

/* Actions */
export const BEGIN_STARTUP = 'NV.CORE.BEGIN_STARTUP';
export const END_STARTUP = 'NV.CORE.END_STARTUP';

/* Action Creators */
export const beginStartup = createAction(BEGIN_STARTUP);
export const endStartup = createAction(END_STARTUP);

/* Thunks */
export const startup = () => async dispatch => {
  await dispatch(beginStartup());

  await dispatch(receiveProgram(examples.pow2D));
  await dispatch(executeProgram({ b: 2, p: 3 }));
  await dispatch(refreshViewport());
  await dispatch(refreshProgram());

  await dispatch(endStartup());
};
