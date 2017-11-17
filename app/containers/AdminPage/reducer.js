/*
 *
 * AdminPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ALL_QUESTIONNAIRE_SUCCESS,
} from './constants';

const initialState = fromJS({});

function adminPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ALL_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        questionnaire: action.payload,
      };
    default:
      return state;
  }
}

export default adminPageReducer;
