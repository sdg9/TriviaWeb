
export const empty = {
};
export const noGames = {
  games: {},
  questionnaires: {
    A1: [
      'A',
      'B',
      'C',
    ],
  },
  questions: {
    A: {
      question: 'Question A',
      answer: 'Answer A',
    },
    B: {
      question: 'Question B',
      answer: 'Answer B',
    },
    C: {
      question: 'Question C',
      answer: 'Answer C',
    },
    D: {
      question: 'Question D',
      answer: 'Answer D',
    },
  },
};
export const oneGame = {
  players: {
    somePlayerID: {
      name: 'Frank',
    },
  },
  games: {
    1234: {
      round: 0,
      someKey: 'someValue',
    },
  },
};
export const gameAtLobby = {
  games: {
    1234: {
      questionnaire: 'A1',
      status: 'LOBBY',
    },
  },
  questionnaires: {
    A1: [
      'A',
      'B',
      'C',
    ],
  },
  questions: {
    A: {
      question: 'Question A',
      answer: 'Answer A',
    },
    B: {
      question: 'Question B',
      answer: 'Answer B',
    },
    C: {
      question: 'Question C',
      answer: 'Answer C',
    },
    D: {
      question: 'Question D',
      answer: 'Answer D',
    },
  },
};
export const gameStarted = {
  games: {
    1234: {
      status: 'IN-PROGRESS-ROUND',
    },
  },
};
export const questions = {
  questions: {
    '-Ky237LlqjKRQ1WdxhIr': {
      answer: 'red',
      question: 'What color is mario?',
    },
  },
};
export const gameWithQuestions = {
  games: {
    1234: {
      status: 'IN-PROGRESS-ROUND',
      questionnaire: 'A1',
      round: 0,
      questions: [
        {
          key: 'A',
          question: 'Question A',
          answer: 'Answer A',
        },
        {
          key: 'B',
          question: 'Question B',
          answer: 'Answer B',
        },
        {
          key: 'C',
          question: 'Question C',
          answer: 'Answer C',
        },
      ],
    },
  },
  questionnaires: {
    A1: [
      'A',
      'B',
      'C',
      'D',
    ],
  },
  questions: {
    A: {
      question: 'Question A',
      answer: 'Answer A',
    },
    B: {
      question: 'Question B',
      answer: 'Answer B',
    },
    C: {
      question: 'Question C',
      answer: 'Answer C',
    },
    D: {
      question: 'Question D',
      answer: 'Answer D',
    },
  },
};
export const gameWithMultipleQuestionnaires = {
  games: {
    1234: {
      status: 'IN-PROGRESS-ROUND',
      questionnaire: 'A1',
      round: 0,
      questions: [
        {
          key: 'A',
          question: 'Question A',
          answer: 'Answer A',
        },
        {
          key: 'B',
          question: 'Question B',
          answer: 'Answer B',
        },
        {
          key: 'C',
          question: 'Question C',
          answer: 'Answer C',
        },
      ],
    },
  },
  questionnaires: {
    A1: [
      'A',
      'B',
      'C',
      'D',
    ],
    B2: [
      'A',
      'C',
      'D',
    ],
  },
  questions: {
    A: {
      question: 'Question A',
      answer: 'Answer A',
    },
    B: {
      question: 'Question B',
      answer: 'Answer B',
    },
    C: {
      question: 'Question C',
      answer: 'Answer C',
    },
    D: {
      question: 'Question D',
      answer: 'Answer D',
    },
  },
};

export const playerResponse = {
  scores: {
    1234: {
      playerKey: [
        {
          isCorrect: false,
          resonse: 'something wrong',
        },
      ],
    },
  },
};

export const scoreBoard = {
  scores: {
    1234: {
      playerKeyA: [
        {
          isCorrect: true,
        },
        {
          isCorrect: false,
          isCorrectAdminOverride: true,
        },
        {
          isCorrect: false,
          isCorrectAdminOverride: true,
        },
      ],
      playerKeyB: [
        {
          isCorrect: true,
        },
        {
          isCorrect: false,
        },
        {
          isCorrect: false,
          isCorrectAdminOverride: true,
        },
      ],
      playerKeyC: [
        {
          isCorrect: true,
        },
        {
          isCorrect: false,
          isCorrectAdminOverride: true,
        },
      ],
    },
  },
};

export const betterFakeQuestions = {
  games: {
  },
  questionnaires: {
    fakeQuestionnaire: [
      'A',
      'B',
      'C',
      'D',
    ],
  },
  questions: {
    A: {
      question: 'What color does Mario wear?',
      answer: 'red',
    },
    B: {
      question: 'What is the square root of 64?',
      answer: '8',
    },
    C: {
      question: 'What is the largest US city? (in population)',
      answer: 'New York City',
    },
    D: {
      question: 'Which has more reeds, a dime or a quarter?',
      answer: 'Quarter',
    },
  },
};
