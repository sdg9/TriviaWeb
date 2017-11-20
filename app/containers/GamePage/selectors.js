import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the gamePage state domain
 */
const selectGamePageDomain = (state) => state.get('gamePage');

const selectMatchDomain = (state, props) => props.match.params.roomCode;

const selectGameStateDomain = (state) => _.get(state.get('firebase'), 'game.items.status');

const selectCurrentRoundDomain = (state) => _.get(state.get('firebase'), 'game.items.round');

const selectCurrentQuestionDomain = (state) => _.get(state.get('firebase'), 'game.items.currentQuestion.question');

const selectScoreDomain = (state) => _.get(state.get('firebase'), 'score.items');

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

export const getCurrentRound = () => createSelector(
  selectCurrentRoundDomain,
  (substate) => substate
);

export const getCurrentQuestion = () => createSelector(
  selectCurrentQuestionDomain,
  (substate) => substate
);

export const getScore = () => createSelector(
  selectScoreDomain,
  (substate) => substate
);


const selectGameDomain = (state) => _.get(state.get('firebase'), 'game.items');
export const getGame = () => createSelector(
 selectGameDomain,
 (substate) => substate
);
