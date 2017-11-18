import { all } from 'redux-saga/effects';

import * as firebaseSagas from './containers/Firebase/sagas';
import { metaTypes } from './containers/Firebase/types';

export default function* rootSaga() {
  yield all([
    firebaseSagas.watchListener(metaTypes.game),
    firebaseSagas.watchListener(metaTypes.allGames),
    firebaseSagas.watchListener(metaTypes.score),
    // firebaseSagas.watchUpdateRequested(),
  ]);
}
