import { createAction } from '../utils';
import {
  runProgram,
  createConstructs,
  parseConstruct,
  parseLink,
  generateProgram,
} from '../../lib/utils/nebula';
import { receiveConstructs, resetConstructs, receiveConstructMap } from '../Constructs/actions';
import { receiveLinks, resetLinks } from '../Links/actions';

/* Actions */
export const RECEIVE_PROGRAM = 'NV.PROGRAM.RECEIVED_DATA';
export const RESET_PROGRAM = 'NV.PROGRAM.RESET_PROGRAM';

/* Action Creators */
export const receiveProgram = createAction(RECEIVE_PROGRAM);
export const resetProgram = createAction(RESET_PROGRAM);

/* Thunks */
export const executeProgram = params => async (dispatch, getState) => {
  const { program: { data: program } } = getState();
  const response = runProgram(program, params);
  return response;
};

export const refreshProgram = () => async (dispatch, getState) => {
  const {
    constructs: { map: constructMap, data: constructs },
    links: { data: links },
  } = getState();
  const program = generateProgram(constructs, links, constructMap);
  console.log(program);
  dispatch(receiveProgram(program));
  return program;
};

export const refreshViewport = () => async (dispatch, getState) => {
  const { program: { data: program } } = getState();
  const { constructs: rawConstructs, links: rawLinks } = createConstructs(program);

  console.log(rawConstructs);

  const constructMap = {};
  let key = 0;
  /* eslint-disable no-param-reassign */
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
  /* eslint-enable no-param-reassign */

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
