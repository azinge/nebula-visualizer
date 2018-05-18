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
export const RESET_PROGRAM = 'NV.PROGRAM.RESET_DATA';
export const RECEIVE_PARAMS = 'NV.PROGRAM.RECEIVED_PARAMS';
export const RESET_PARAMS = 'NV.PROGRAM.RESET_PARAMS';

/* Action Creators */
export const receiveProgram = createAction(RECEIVE_PROGRAM);
export const resetProgram = createAction(RESET_PROGRAM);
export const receiveParams = createAction(RECEIVE_PARAMS);
export const resetParams = createAction(RESET_PARAMS);

/* Thunks */
export const executeProgram = () => async (dispatch, getState) => {
  const { program: { data: program, params } } = getState();
  const response = runProgram(program, JSON.parse(params || '{}'));
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

  await dispatch(resetConstructs());
  await dispatch(resetLinks());
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
  await dispatch(receiveConstructMap(constructMap));
  await dispatch(receiveConstructs(constructs));
  await dispatch(receiveLinks(links));
};
