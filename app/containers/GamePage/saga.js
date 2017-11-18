// @flow

import { takeLatest } from 'redux-saga/effects';
import ons from 'onsenui';
import * as firebase from '../../utils/firebase';

import {
  SUBMIT_ANSWER_ACTION,
 } from './constants';

export function* answerQuestion(action: Object): Generator<*, void, *> {
  const {
    roomCode,
    playerKey,
    gameRound,
    answer,
  } = action.payload;
  try {
    // console.log('Call answer question')
    yield firebase.answerQuestion(roomCode, playerKey, gameRound, answer);
    // yield firebase.answerQuestion();
  } catch (e) {
    ons.notification.alert(e.message);
  }
}


// Individual exports for testing
export default function* defaultSaga(): Generator<*, void, *> {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SUBMIT_ANSWER_ACTION, answerQuestion);
}
