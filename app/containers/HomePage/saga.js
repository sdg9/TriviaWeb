// @flow
// import { take, call, put, select } from 'redux-saga/effects';

import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ons from 'onsenui';
import * as firebase from '../../utils/firebase';
import type {
  Key,
} from '../../types/FirebaseTypes';

import type { JoinGame } from './types';
import { JOIN_GAME } from './constants';

const LOCAL_STORAGE_PLAYER_KEY = 'playerKey';

/**
 * Github repos request/response handler
 */
export function* joinGame(action: JoinGame): Generator<*, void, Key> {
  try {
    // Check for player key in local storage in case user was disconnected and
    // is rejoining
    const myPlayerKey = localStorage.getItem(LOCAL_STORAGE_PLAYER_KEY);
    const playerKey = yield firebase.joinGame(action.payload.roomCode.toUpperCase(), action.payload.playerName.toUpperCase(), myPlayerKey);
    yield localStorage.setItem(LOCAL_STORAGE_PLAYER_KEY, playerKey.key);
    yield put(push(`/game/${action.payload.roomCode.toUpperCase()}`));
  } catch (e) {
    ons.notification.alert(e.message);
  }
}

// Individual exports for testing
export default function* defaultSaga(): Generator<void, void, void> {
  // Watches for JOIN_GAME actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(JOIN_GAME, joinGame);
}
