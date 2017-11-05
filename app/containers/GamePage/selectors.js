import { createSelector } from 'reselect';

/**
 * Direct selector to the gamePage state domain
 */
const selectGamePageDomain = (state) => state.get('gamePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GamePage
 */

const makeSelectGamePage = () => createSelector(
  selectGamePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectGamePage;
export {
  selectGamePageDomain,
};
