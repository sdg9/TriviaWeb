/*
 *
 * GamePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  JOIN_GAME,
} from './constants';

const initialState = fromJS({});

function gamePageReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_GAME:
      return state;
    default:
      return state;
  }
}

export default gamePageReducer;
