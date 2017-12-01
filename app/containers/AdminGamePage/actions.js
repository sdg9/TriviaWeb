/*
 *
 * AdminGamePage actions
 *
 */

import {
  DEFAULT_ACTION,
  START_GAME_ACTION,
  ADVANCE_ROUND_ACTION,
  END_GAME_ACTION,
  TOGGLE_SCORE_VISIBILITY,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function startGame(roomCode: string) {
  return {
    type: START_GAME_ACTION,
    payload: {
      roomCode,
    },
  };
}

export function advanceRound(roomCode: string) {
  return {
    type: ADVANCE_ROUND_ACTION,
    payload: {
      roomCode,
    },
  };
}

export function endGame(roomCode: string) {
  return {
    type: END_GAME_ACTION,
    payload: {
      roomCode,
    },
  };
}

export function toggleScoreVisibilty(roomCode: string) {
  return {
    type: TOGGLE_SCORE_VISIBILITY,
    payload: {
      roomCode,
    },
  };
}
