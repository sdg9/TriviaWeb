/*
 * @flow
 * GamePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_ANSWER_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function answerQuestion(roomCode: string, gameRound: number, answer: string) {
  return {
    type: SUBMIT_ANSWER_ACTION,
    payload: {
      roomCode,
      playerKey: localStorage.getItem('playerKey'),
      gameRound,
      answer,
    },
  };
}
