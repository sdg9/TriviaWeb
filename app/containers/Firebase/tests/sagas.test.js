/* eslint-disable redux-saga/yield-effects */
import { put, take, call, fork } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import * as sagas from '../sagas';
import * as types from '../types';
import * as actions from '../actions';
// import firebase from '../firebase'
import firebase from '../../../utils/firebase';

test.only(`watchUpdateRequested ${types.metaTypes.userContacts}`, () => {
  const generator = sagas.watchUpdateRequested();
  const updates = { updates: { a: '1', b: '2' } };
  const action = actions.updateUserContactsRequested('someUID');
  const selector = sagas.getUserContactsUpdates;

  const it1 = generator.next().value;
  const it2 = generator.next(action).value;
  const it3 = generator.next(updates).value;
  console.log('1: ', it1);
  console.log('2: ', it2);
  console.log('3: ', it3);
  // console.log('4: ', it4);
  expect(it1).toEqual(
    take(types.firebase.FIREBASE_UPDATE_REQUESTED)
  );
  expect(it2).toEqual(call(selector, action.payload));
  expect(it3).toEqual(
    fork(sagas.updateItems, updates, action.meta.type)
  );
});

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
  console.log('Val: ', val);
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

test('getUpdateOfferingUpdates', () => {
  const uid = '1';
  const contactId = '123';
  const name = 'John Doe';
  const phone = '123456789';

  const updates = {
    [`users/${uid}/contacts/${contactId}/name`]: name,
    [`users/${uid}/contacts/${contactId}/phone`]: phone,
  };

  expect(sagas.getUserContactsUpdates({ uid, contactId, name, phone })).toEqual(
    updates
  );
});
