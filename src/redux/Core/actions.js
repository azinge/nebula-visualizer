import { createAction } from '../utils';
import { runProgram, createConstructs, parseConstruct, parseLink } from '../../lib/utils/nebula';
import examples from '../../lib/utils/nebula/examples';
import { receiveConstructs, resetConstructs, receiveConstructMap } from '../Constructs/actions';
import { receiveLinks, resetLinks } from '../Links/actions';

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

  const constructMap = {};
  let key = 0;
  /* eslint-disable-line no-param-reassign */
  const assignKeys = construct => {
    construct.id = key;
    constructMap[key] = construct;
    key += 1;
    if (Array.isArray(construct.children)) {
      construct.children.forEach(assignKeys);
      construct.children = construct.children.map(con => con.id);
    }
    return construct;
  };
  /* eslint-disable-line no-param-reassign */

  const constructs = rawConstructs
    .map(parseConstruct)
    .map(assignKeys)
    .map(con => con.id);
  const links = rawLinks
    .map(parseLink)
    .map(assignKeys)
    .map(link => link.id);

  console.log(constructMap, constructs, links);

  await dispatch(resetConstructs());
  await dispatch(resetLinks());
  await dispatch(receiveConstructMap(constructMap));
  await dispatch(receiveConstructs(constructs));
  await dispatch(receiveLinks(links));
};

export const startup = () => async dispatch => {
  await dispatch(beginStartup());

  await dispatch(executeProgram(examples.helloWorld2D));
  await dispatch(refreshViewport(examples.pow2D));

  await dispatch(endStartup());
};
