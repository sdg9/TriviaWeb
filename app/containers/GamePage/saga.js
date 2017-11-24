// @flow

import { takeLatest } from 'redux-saga/effects';
import ons from 'onsenui';
import * as firebase from '../../utils/firebase';

import {
  SUBMIT_ANSWER_ACTION,
  SET_FOCUS,
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

export function* setFocus(action: Object): Generator<*, void, *> {
  const {
    roomCode,
    playerKey,
    isFocused,
  } = action.payload;
  try {
    yield firebase.setFocus(roomCode, playerKey, isFocused);
  } catch (e) {
    // Silently fail
  }
}

// Individual exports for testing
export default function* defaultSaga(): Generator<*, void, *> {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SUBMIT_ANSWER_ACTION, answerQuestion);
  yield takeLatest(SET_FOCUS, setFocus);
}
