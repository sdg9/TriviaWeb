/*
 * @flow
 * AdminPage actions
 *
 */

import type {
  QuestionnaireMap,
} from '../../types/FirebaseTypes';

import {
  DEFAULT_ACTION,
  CREATE_GAME_ACTION,
  ALL_QUESTIONNAIRE_REQUEST,
  ALL_QUESTIONNAIRE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createGame(questionnaire) {
  return {
    type: CREATE_GAME_ACTION,
    payload: {
      questionnaire,
    },
  };
}

export function getQuestionnaires() {
  return {
    type: ALL_QUESTIONNAIRE_REQUEST,
  };
}

export function getQuestionnairesSuccess(questionnaires: QuestionnaireMap) {
  return {
    type: ALL_QUESTIONNAIRE_SUCCESS,
    payload: questionnaires,
  };
}
