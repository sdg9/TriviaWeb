// @flow

import {
  JOIN_GAME,
} from './constants';

export type JoinGame = {
  type: JOIN_GAME,
  payload: {
    roomCode: string,
    playerName: string,
  }
}
