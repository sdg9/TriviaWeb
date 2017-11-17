import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the adminPage state domain
 */
export const selectAdminPageDomain = (state) => state.get('adminPage');


/**
 * Other specific selectors
 */
const getAllGamesDomain = (state) => _.get(state.get('firebase'), 'allGames.items');

export const getAllGames = () => createSelector(
  getAllGamesDomain,
  (substate) => substate
);


/**
 * Default selector used by AdminPage
 */

const makeSelectAdminPage = () => createSelector(
  selectAdminPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAdminPage;
