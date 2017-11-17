// @flow

import { takeLatest, put } from 'redux-saga/effects';
import ons from 'onsenui';
import * as firebase from '../../utils/firebase';
import type {
  Key,
  QuestionnaireMap,
} from '../../types/FirebaseTypes';

import { getQuestionnairesSuccess } from './actions';

import {
  CREATE_GAME_ACTION,
  ALL_QUESTIONNAIRE_REQUEST,
 } from './constants';

/**
 * Github repos request/response handler
 */
export function* createGame(action: Object): Generator<*, void, Key> {
  const questionnaire = action.payload.questionnaire;

  try {
    const game = yield firebase.createGame(questionnaire);
    ons.notification.alert(`${game.key} created`);
  } catch (e) {
    ons.notification.alert(e.message);
  }
}

export function* getQuestionnaires(): Generator<*, void, QuestionnaireMap> {
  try {
    const questionnaires = yield firebase.getAllQuestionnaires();
    // console.log('Questionnaires: ', questionnaires);
    yield put(getQuestionnairesSuccess(questionnaires));
  } catch (e) {
    ons.notification.alert(e.message);
  }
}

// Individual exports for testing
export default function* defaultSaga(): Generator<void, void, void> {
  yield takeLatest(CREATE_GAME_ACTION, createGame);
  yield takeLatest(ALL_QUESTIONNAIRE_REQUEST, getQuestionnaires);
}
