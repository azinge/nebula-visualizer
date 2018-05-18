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
  const updateRelativeChildren = (id, delta) => {
    constructMap[id].pos.x += delta.x;
    constructMap[id].pos.y += delta.y;
    constructMap[id].children.forEach(id2 => updateRelativeChildren(id2, delta));
  };
  if (constructMap[con.id] && con.pos) {
    const delta = {
      x: con.pos.x - constructMap[con.id].pos.x,
      y: con.pos.y - constructMap[con.id].pos.y,
    };
    con.children.forEach(id => updateRelativeChildren(id, delta));
  }
  const updatedConstructMap = { ...constructMap, [con.id]: con };
  await dispatch(receiveConstructMap(updatedConstructMap));
  return updatedConstructMap;
};
