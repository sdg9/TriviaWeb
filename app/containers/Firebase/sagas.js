/* eslint-disable no-constant-condition */
import { eventChannel, buffers } from 'redux-saga';
import { put, take, call, fork, cancel, flush } from 'redux-saga/effects';

import * as types from './types';
import * as actions from './actions';
// import firebase from './firebase'
import firebase from '../../utils/firebase';

export function* watchUpdateRequested() {
  while (true) {
    const action = yield take(types.firebase.FIREBASE_UPDATE_REQUESTED);
    let getUpdates = null;
    switch (action.meta.type) {
      case types.metaTypes.userContacts:
        getUpdates = getUserContactsUpdates;
        break;
      default:
        break;
    }
    if (typeof getUpdates === 'function') {
      const updates = yield call(getUpdates, action.payload);
      yield fork(updateItems, updates, action.meta.type);
    }
  }
}

export function* watchRemoveRequested() {
  while (true) {
    const action = yield take(types.firebase.FIREBASE_REMOVE_REQUESTED);
    let getPath = null;
    switch (action.meta.type) {
      case types.metaTypes.userContacts:
        getPath = getUserContactsPath;
        break;
      default:
        break;
    }

    if (typeof getPath === 'function') {
      const path = yield call(getPath, action.payload);
      yield fork(removeItem, path, action.meta.type);
    }
  }
}

export function getUserContactsPath({ uid, contactId }) {
  return `users/${uid}/contacts/${contactId}`;
}

export function getUserContactsUpdates({ uid, contactId, name, phone }) {
  return {
    [`users/${uid}/contacts/${contactId}/name`]: name,
    [`users/${uid}/contacts/${contactId}/phone`]: phone,
  };
}

export function* updateItems(updates, metaType) {
  try {
    const ref = firebase.database().ref();
    yield call([ref, ref.update], updates);
    yield put(actions.firebaseUpdateFulfilled(metaType));
  } catch (error) {
    yield put(actions.firebaseUpdateRejected(error, metaType));
  }
}

export function* removeItem(path, metaType) {
  try {
    const ref = firebase.database().ref(path);
    yield call([ref, ref.remove]);
    yield put(actions.firebaseRemoveFulfilled(metaType));
  } catch (error) {
    yield put(actions.firebaseRemoveRejected(error, metaType));
  }
}

export function createEventChannel(ref) {
  const listener = eventChannel((emit) => {
    ref.on('child_added', (snap) => {
      emit({
        eventType: types.eventTypes.CHILD_ADDED,
        key: snap.key,
        value: snap.val(),
      });
    });

    ref.on('child_changed', (snap) => {
      // const val = snap.val();
      emit({
        eventType: types.eventTypes.CHILD_CHANGED,
        key: snap.key,
        value: snap.val(),
      });
    });

    ref.on('child_removed', (snap) => {
      emit({ eventType: types.eventTypes.CHILD_REMOVED, key: snap.key });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

export function* getDataAndListenToChannel(ref, metaType) {
  const chan = yield call(createEventChannel, ref);
  try {
    try {
      const snap = yield call([ref, ref.once], 'value');
      yield flush(chan);
      const val = snap.val();
      const value = val || {};
      yield put(actions.firebaseListenFulfilled(value, metaType));
    } catch (error) {
      yield put(actions.firebaseListenRejected(error, metaType));
    }
    while (true) {
      const data = yield take(chan);
      yield put(getUpdateAction(data, metaType));
    }
  } finally {
    chan.close();
  }
}

export function getUpdateAction(data, metaType) {
  switch (data.eventType) {
    case types.eventTypes.CHILD_ADDED:
      return actions.firebaseListenChildAdded(data.key, data.value, metaType);
    case types.eventTypes.CHILD_CHANGED:
      return actions.firebaseListenChildChanged(data.key, data.value, metaType);
    case types.eventTypes.CHILD_REMOVED:
      return actions.firebaseListenChildRemoved(data.key, metaType);
    default:
      return null;
  }
}

export function* watchListener(metaType) {
  while (true) {
    const listenRequestAction = yield take(
      types.firebase.FIREBASE_LISTEN_REQUESTED
    );
    if (listenRequestAction.meta.type === metaType) {
      let task = yield fork(
        getDataAndListenToChannel,
        listenRequestAction.payload.ref,
        metaType
      );
      while (true) {
        const action = yield take([
          types.firebase.FIREBASE_REMOVE_LISTENER_REQUESTED,
          types.firebase.FIREBASE_LISTEN_REQUESTED,
          types.firebase.FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED,
        ]);

        if (
          action.type ===
            types.firebase.FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED ||
          action.meta.type === metaType
        ) {
          yield cancel(task);
          yield put(
            actions.firebaseListenRemoved(!!action.payload.clearItems, metaType)
          );

          if (action.type === types.firebase.FIREBASE_LISTEN_REQUESTED) {
            task = yield fork(
              getDataAndListenToChannel,
              action.payload.ref,
              metaType
            );
          } else {
            break;
          }
        }
      }
    }
  }
}
