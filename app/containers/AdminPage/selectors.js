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

const getQuestionnaireDomain = (state) => _.get(state.get('adminPage'), 'questionnaire');

export const getAllGames = () => createSelector(
  getAllGamesDomain,
  (substate) => substate
);


/**
 * Default selector used by AdminPage
 */

export const makeSelectQuestionnaire = () => createSelector(
  getQuestionnaireDomain,
  (substate) => substate
);
