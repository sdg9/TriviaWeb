
import ons from 'onsenui';
import type { Dispatch } from 'redux';
import {
  JOIN_GAME,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {roomCode} roomCode The game to join
 * @param  {playerName} playerName The name of the player (or team) joining the game
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function joinGame(roomCode: string, playerName: string) {
  return (dispatch: Dispatch<*>) => {
    if (!playerName || !roomCode) {
      ons.notification.alert('Please fill in all form fields.');
    } else if (roomCode.length !== 4) {
      ons.notification.alert('Room code must be 4 characters.');
    } else {
      dispatch({
        type: JOIN_GAME,
        payload: {
          roomCode,
          playerName,
        },
      });
    }
  };
}
