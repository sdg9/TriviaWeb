// @flow

export default function createReducer(initialState: Object, handlers: Object) {
  return function reducer(
    state: Object = initialState,
    action: { type: string }
  ) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    // if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
