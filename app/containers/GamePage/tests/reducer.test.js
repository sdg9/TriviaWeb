
import { fromJS } from 'immutable';
import gamePageReducer from '../reducer';

describe('gamePageReducer', () => {
  it('returns the initial state', () => {
    expect(gamePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
