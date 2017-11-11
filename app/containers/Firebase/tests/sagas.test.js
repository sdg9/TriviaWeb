/* eslint-disable redux-saga/yield-effects */
import { put, take, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import * as sagas from '../sagas';
import * as types from '../types';
import * as actions from '../actions';
// import firebase from '../firebase'
import firebase from '../../../utils/firebase';

test('watchUpdateRequested unknownType', () => {
  const generator = sagas.watchUpdateRequested();

  // test non function case
  expect(generator.next().value).toEqual(
    take(types.firebase.FIREBASE_UPDATE_REQUESTED)
  );
  expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
    take(types.firebase.FIREBASE_UPDATE_REQUESTED)
  );
});

test('updateItems - regular stream - success and failure', () => {
  const updates = { x: true };
  const metaType = 'someType';
  const ref = firebase.database().ref();
  const generator = cloneableGenerator(sagas.updateItems)(updates, metaType);

  const val = generator.next().value;
  expect(val).toEqual(call([ref, ref.update], updates));

  const successGenerator = generator.clone();
  expect(successGenerator.next().value).toEqual(
    put(actions.firebaseUpdateFulfilled(metaType))
  );
  expect(successGenerator.next().done).toEqual(true);

  const failGenerator = generator.clone();
  const error = new Error('An error occured');
  expect(failGenerator.throw(error).value).toEqual(
    put(actions.firebaseUpdateRejected(error, metaType))
  );
  expect(failGenerator.next().done).toEqual(true);
});
