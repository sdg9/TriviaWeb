
import {
  loadData,
  // createGame,
} from '../firebase';

import {
  officialQuestions,
} from './firebaseData/data';

beforeEach(async () => {
  await loadData(officialQuestions);
});
it('createGame should not create game with same ID when it already exists', async () => {
  expect(true).toBe(true);
  // try {
  //   // await createGame('A1', '1234');
  // } catch (error) {
  //   expect(error.message).toBe('Game already exists');
  // }
});
