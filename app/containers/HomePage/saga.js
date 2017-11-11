// import { take, call, put, select } from 'redux-saga/effects';

import { JOIN_GAME } from 'containers/HomePage/constants';
import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import ons from 'onsenui';

import type { JoinGame } from './types';

/**
 * Github repos request/response handler
 */
export function* joinGame(action: JoinGame) {
  try {
    yield put(push(`/game/${action.payload.roomCode}`));
  } catch (e) {
    ons.notification.alert(e.message);
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // Watches for JOIN_GAME actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(JOIN_GAME, joinGame);
}
