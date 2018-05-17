import { createAction } from '../utils';
import { runProgram, createConstructs, parseConstruct, parseLink } from '../../lib/utils/nebula';
import examples from '../../lib/utils/nebula/examples';
import { receiveConstructs } from '../Constructs/actions';
import { receiveLinks } from '../Links/actions';

/* Actions */
export const BEGIN_STARTUP = 'NV.CORE.BEGIN_STARTUP';
export const END_STARTUP = 'NV.CORE.END_STARTUP';

/* Action Creators */
export const beginStartup = createAction(BEGIN_STARTUP);
export const endStartup = createAction(END_STARTUP);

/* Thunks */
export const executeProgram = program => async () => {
  const response = runProgram(program);
  return response;
};

export const refreshViewport = program => async dispatch => {
  const { constructs: rawConstructs, links: rawLinks } = createConstructs(program);

  console.log(rawConstructs);

  const constructs = rawConstructs.map(parseConstruct);
  const links = rawLinks.map(parseLink);

  await dispatch(receiveConstructs(constructs));
  await dispatch(receiveLinks(links));
};

export const startup = () => async dispatch => {
  await dispatch(beginStartup());

  await dispatch(executeProgram(examples.helloWorld2D));
  await dispatch(refreshViewport(examples.pow2D));

  await dispatch(endStartup());
};
