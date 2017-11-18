// @flow

import { takeLatest } from 'redux-saga/effects';
import ons from 'onsenui';
import * as firebase from '../../utils/firebase';

import {
  ADVANCE_ROUND_ACTION,
  START_GAME_ACTION,
  END_GAME_ACTION,
 } from './constants';

export function* startGame(action: Object): Generator<*, void, *> {
  const roomCode = action.payload.roomCode;
  try {
    yield firebase.startGame(roomCode);
  } catch (e) {
    ons.notification.alert(e.message);
  }
}

export function* endGame(action: Object): Generator<*, void, *> {
  const roomCode = action.payload.roomCode;
  try {
    yield firebase.endGame(roomCode);
  } catch (e) {
    ons.notification.alert(e.message);
  }
}


export function* advanceRound(action: Object): Generator<*, void, void> {
  try {
    const roomCode = action.payload.roomCode;
    yield firebase.advanceGameRound(roomCode);
  } catch (e) {
    ons.notification.alert(e.message);
  }
}


// Individual exports for testing
export default function* defaultSaga(): Generator<*, void, *> {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ADVANCE_ROUND_ACTION, advanceRound);
  yield takeLatest(START_GAME_ACTION, startGame);
  yield takeLatest(END_GAME_ACTION, endGame);
}
