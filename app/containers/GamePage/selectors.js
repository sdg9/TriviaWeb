import { createSelector } from 'reselect';

/**
 * Direct selector to the gamePage state domain
 */
const selectGamePageDomain = (state) => state.get('gamePage');

const selectMatchDomain = (state, props) => props.match.params.roomCode;

/**
 * Other specific selectors
 */


/**
 * Default selector used by GamePage
 */

export const makeSelectGamePage = () => createSelector(
  selectGamePageDomain,
  (substate) => substate.toJS()
);

export const getRoomCode = () => createSelector(
  selectMatchDomain,
  (substate) => substate
);
