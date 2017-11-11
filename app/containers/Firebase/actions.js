// @flow
import firebase from '../../utils/firebase';

import * as types from './types';

type FirebaseReference = Object;

export function firebaseListenRequested(ref: FirebaseReference, metaType: string) {
  console.log('FLR: ', ref);
  return {
    type: types.firebase.FIREBASE_LISTEN_REQUESTED,
    payload: ref,
    meta: { type: metaType },
  };
}

export function firebaseListenRejected(error: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_REJECTED,
    payload: { error },
    meta: { type: metaType },
  };
}

export function firebaseListenFulfilled(items: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_FULFILLED,
    payload: { items },
    meta: { type: metaType },
  };
}

export function firebaseListenChildAdded(id: string, value: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_CHILD_ADDED,
    payload: { id, value },
    meta: { type: metaType },
  };
}

export function firebaseListenChildChanged(id: string, value: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_CHILD_CHANGED,
    payload: { id, value },
    meta: { type: metaType },
  };
}

export function firebaseListenChildRemoved(id: string, metaType: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_CHILD_REMOVED,
    payload: { id },
    meta: { type: metaType },
  };
}

export function firebaseUpdateRequested(payload: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_UPDATE_REQUESTED,
    payload,
    meta: { type: metaType },
  };
}

export function firebaseUpdateRejected(error: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_UPDATE_REJECTED,
    payload: { error },
    meta: { type: metaType },
  };
}

export function firebaseUpdateFulfilled(metaType: string) {
  return {
    type: types.firebase.FIREBASE_UPDATE_FULFILLED,
    payload: {},
    meta: { type: metaType },
  };
}

export function firebaseRemoveRequested(payload: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_REMOVE_REQUESTED,
    payload,
    meta: { type: metaType },
  };
}

export function firebaseRemoveRejected(error: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_REMOVE_REJECTED,
    payload: { error },
    meta: { type: metaType },
  };
}

export function firebaseRemoveFulfilled(metaType: string) {
  return {
    type: types.firebase.FIREBASE_REMOVE_FULFILLED,
    payload: {},
    meta: { type: metaType },
  };
}

export function firebaseListenRemoved(clearItems: Object, metaType: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_REMOVED,
    payload: { clearItems },
    meta: { type: metaType },
  };
}

export function firebaseRemoveListenerRequested(clearItems: boolean, metaType: string) {
  return {
    type: types.firebase.FIREBASE_REMOVE_LISTENER_REQUESTED,
    payload: { clearItems },
    meta: { type: metaType },
  };
}

export function firebaseRemoveAllListenersRequested() {
  return {
    type: types.firebase.FIREBASE_REMOVE_ALL_LISTENERS_REQUESTED,
    payload: { clearItems: true },
  };
}

// export function listenToMessages() {
//   const ref = firebase.database().ref('messages')
//   return firebaseListenRequested(ref, types.metaTypes.messages)
// }

// export function listenToUserContacts(uid) {
//   const ref = firebase.database().ref(`users/${uid}/contacts`)
//   return firebaseListenRequested(ref, types.metaTypes.userContacts)
// }
export function listenToGame(gameKey: string) {
  const ref = firebase.database().ref(`games/${gameKey}`);

  return firebaseListenRequested(ref, types.metaTypes.game);
}

export function removeMessagesListenerRequested() {
  return firebaseRemoveListenerRequested(false, types.metaTypes.messages);
}

export function removeUserContactsListenerRequested() {
  return firebaseRemoveListenerRequested(false, types.metaTypes.userContacts);
}

export function updateUserContactsRequested(uid: string, contactId: string, name: string, phone: string) {
  return firebaseUpdateRequested(
    { uid, contactId, name, phone },
    types.metaTypes.userContacts
  );
}

export function removeUserContactsRequested(uid: string, contactId: string) {
  return firebaseRemoveRequested({ uid, contactId }, types.metaTypes.userContacts);
}
