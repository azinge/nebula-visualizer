/* Action utils */
export function createAction(type) {
  return payload => (payload === undefined ? { type } : { type, payload });
}

export function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    });
  }, ms);
}
