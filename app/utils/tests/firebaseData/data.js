
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

export const officialQuestions = {
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
      question: 'What is the exact date Discover started trading on the NYSE as a public company?',
      answer: 'a',
      multipleChoice: {
        a: 'July 2, 2007',
        b: 'Some other date',
        c: 'Some other date',
        d: 'Some other date',
      },
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

export const demoQuestions = {
  games: {
  },
  questionnaires: {
    demoQuestionnaire: [
      'A1',
      'A2',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'A9',
      'A10',
    ],
    fakeQuestionnaire: [
      'A',
      'B',
      'C',
      'D',
    ],

  },
  questions: {
    A1: {
      question: 'Who painted the Sistine Chapel?',
      answer: 'a',
      multipleChoice: {
        a: 'Michaelangelo',
        b: 'Pablo Picasso',
        c: 'Leonardo DiVinchi',
        d: 'Vincent van Gogh',
      },
    },
    A2: {
      question: 'Natural pearls are found in what sea creature?',
      answer: 'b',
      multipleChoice: {
        a: 'Clam',
        b: 'Oyster',
        c: 'Dolphin',
        d: 'Sea Anemone',
      },
    },
    A3: {
      question: 'What color do you get when you mix yellow and blue?',
      answer: 'Green',
    },
    A4: {
      question: 'Which actress played identical twins in the 1998 movie remake of The Parent Trap?',
      answer: 'Lindsay Lohan',
    },
    A5: {
      question: 'Who was the lead singer of the rock band Queen?',
      answer: 'b',
      multipleChoice: {
        a: 'Steven Tyler',
        b: 'Freddie Mercury',
        c: 'David Bowie',
        d: 'Bruce Springsteen',
      },
    },
    A6: {
      question: 'When talking about computer memory, what does the acronym ROM stand for?',
      answer: 'Read-only memory',
    },
    A7: {
      question: 'What animal is the symbol of the United States democratic party?',
      answer: 'donkey',
    },
    A8: {
      question: 'A person able to use both hands with equal skill is called what?',
      answer: 'Ambidextrous',
    },
    A9: {
      question: 'What is the regulation height for a basketball hoop?',
      answer: '10 feet',
    },
    A10: {
      question: 'The paperboard "Chinese takeout" box was invented in what country?',
      answer: 'The United States',
    },
    A: {
      question: 'What is the exact date Discover started trading on the NYSE as a public company?',
      answer: 'a',
      multipleChoice: {
        a: 'July 2, 2007',
        b: 'Some other date',
        c: 'Some other date',
        d: 'Some other date',
      },
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
