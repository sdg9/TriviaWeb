
import { fromJS } from 'immutable';
import adminGamePageReducer from '../reducer';

describe.skip('adminGamePageReducer', () => {
  it('returns the initial state', () => {
    expect(adminGamePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
