import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the gamePage state domain
 */
const selectMatchDomain = (state, props) => props.match.params.roomCode;

const selectGameDomain = (state) => _.get(state.get('firebase'), 'game.items');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GamePage
 */

export const getRoomCode = () => createSelector(
  selectMatchDomain,
  (substate) => substate
);

export const getGame = () => createSelector(
  selectGameDomain,
  (substate) => substate
);
