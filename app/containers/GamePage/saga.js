// import { take, call, put, select } from 'redux-saga/effects';

import { JOIN_GAME } from 'containers/HomePage/constants';

/**
 * Github repos request/response handler
 */
export function* joinGame() {
  console.log('JOIN GAME SAGA')
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  //
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
  // yield takeLatest(JOIN_GAME, joinGame);
}
