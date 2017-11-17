
import {
  loadData,
  createGame,
} from '../firebase';

import {
  gameWithMultipleQuestionnaires,
} from './firebaseData/data';

beforeEach(async () => {
  await loadData(gameWithMultipleQuestionnaires);
});
it('createGame should not create game with same ID when it already exists', async () => {
  try {
    await createGame('A1', '1234');
  } catch (error) {
    expect(error.message).toBe('Game already exists');
  }
});
