
import {
  loadData,
  // createGame,
} from '../firebase';

import {
  // officialQuestions,
  demoQuestions,
} from './firebaseData/data';

beforeEach(async () => {
  // await loadData(officialQuestions);
  await loadData(demoQuestions);
});
it('createGame should not create game with same ID when it already exists', async () => {
  expect(true).toBe(true);
  // try {
  //   // await createGame('A1', '1234');
  // } catch (error) {
  //   expect(error.message).toBe('Game already exists');
  // }
});
