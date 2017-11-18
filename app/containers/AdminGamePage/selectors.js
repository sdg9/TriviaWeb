import { createSelector } from 'reselect';

/**
 * Direct selector to the adminGamePage state domain
 */
const selectAdminGamePageDomain = (state) => state.get('adminGamePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AdminGamePage
 */

const makeSelectAdminGamePage = () => createSelector(
  selectAdminGamePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAdminGamePage;
export {
  selectAdminGamePageDomain,
};

const selectMatchDomain = (state, props) => props.match.params.roomCode;

const selectGameDomain = (state, props) => state.get('firebase').allGames.items[props.match.params.roomCode];

export const getRoomCode = () => createSelector(
  selectMatchDomain,
  (substate) => substate
);

export const getSelectedGame = () => createSelector(
  selectGameDomain,
  (substate) => substate
);
