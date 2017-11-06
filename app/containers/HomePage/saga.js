// import { take, call, put, select } from 'redux-saga/effects';

import { JOIN_GAME } from 'containers/HomePage/constants';
import { takeLatest, put } from 'redux-saga/effects';
import { routerMiddleware, push } from 'react-router-redux'

import type { JoinGame } from './types';
import * as firebase from '../../utils/firebase';
import ons from 'onsenui';

type Key = { key: string };
/**
 * Github repos request/response handler
 */
export function* joinGame(action: JoinGame) {
  console.log('JOIN GAME SAGA', action);

  try {
    const player: Key = yield firebase.joinGame(action.payload.roomCode, action.payload.playerName);
    const myPlayerKey = player.key;

    console.log("Calling push")
    yield put(push('/game/' + action.payload.roomCode))
    console.log('push done')
    // yield put(reposLoad  ed(repos, username));
    // TODO Store player key in local storage
    // TODO Dispatch Join SUCCESS
  } catch (e) {
    // TODO Dispatch Join FAILURE, or just alert
    ons.notification.alert(e.message);
  }
  // try {
  //   // Call our request helper (see 'utils/request')
  //   const repos = yield call(request, requestURL);
  //   yield put(reposLoaded(repos, username));
  // } catch (err) {
  //   yield put(repoLoadingError(err));
  // }
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  // Watches for JOIN_GAME actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(JOIN_GAME, joinGame);
}
