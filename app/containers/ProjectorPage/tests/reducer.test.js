
import { fromJS } from 'immutable';
import projectorPageReducer from '../reducer';

describe.skip('projectorPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectorPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
