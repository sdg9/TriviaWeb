import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the gamePage state domain
 */
const selectGamePageDomain = (state) => state.get('gamePage');

const selectMatchDomain = (state, props) => props.match.params.roomCode;

const selectGameStateDomain = (state) => _.get(state.get('firebase'), 'game.items.status');

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

export const getGameState = () => createSelector(
  selectGameStateDomain,
  (substate) => substate
);
