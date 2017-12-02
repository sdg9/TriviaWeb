
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

export const officialQuestions =
  {
    questionnaires: {
      discoverTrivia: [
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
        'A11',
        'A12',
        'A13',
        'A14',
        'A15',
        'A16',
        'A17',
        'A18',
        'A19',
        'A20',
        'A21',
        'A22',
        'A23',
        'A24',
        'A25',
        'A26',
        'A27',
        'A28',
        'A29',
        'A30',
        'A31',
        'A32',
        'A33',
        'A34',
        'A35',
        'A36',
        'A37',
        'A38',
        'A39',
        'A40',
      ],
    },
    questions: {
      A1: {
        question: '[D] What is the exact date Discover started trading on the NYSE as a public company?',
        answer: 'C',
        multipleChoice: {
          a: 'June 30, 2007',
          b: 'July 2, 2006',
          c: 'July 2, 2007',
          d: 'June 30, 2006',
        },
      },
      A2: {
        question: '[I] In what country was the printing press invented?',
        answer: 'B',
        multipleChoice: {
          a: 'England',
          b: 'Germany',
          c: 'China',
          d: 'Russia',
        },
      },
      A3: {
        question: '[S] What does SAML stand for?',
        answer: 'Security Assertion Markup Language',
      },
      A4: {
        question: '[C] How many total cards are are in Euchre deck?',
        answer: '32',
      },
      A5: {
        question: '[O] What country is hosting the 2018 Winter Olympics?',
        answer: 'D',
        multipleChoice: {
          a: 'China',
          b: 'Japan',
          c: 'North Korea',
          d: 'South Korea',
        },
      },
      A6: {
        question: '[V] Whose Voice is this?',
        answer: 'Paul McCartney',
      },
      A7: {
        question: '[E] What Broadway musical received a record-setting 16 Tony nominations, winning 11, including Best Musical, and was also the recipient of the 2016 Grammy Award for Best Musical Theater Album and the 2016 Pulitzer Prize for Drama.',
        answer: 'Hamilton',
      },
      A8: {
        question: '[R] What does Chicago O’Hare’s airport designation of “ORD” stand for?',
        answer: 'A',
        multipleChoice: {
          a: 'Orchard',
          b: 'Ordinance',
          c: 'Orchid',
          d: 'Oxford',
        },
      },
      A9: {
        question: '[D] Who was the first president of Discover',
        answer: 'Raymond A. Kennedy',
      },
      A10: {
        question: '[I] What is the continuous improvement innovation program in the Discover centers called?',
        answer: 'B',
        multipleChoice: {
          a: 'Innovate now!',
          b: 'iSuggest',
          c: 'Discover Innovation',
          d: 'Innovation Tank',
        },
      },
      A11: {
        question: '[S] Who is the current director of NSA?',
        answer: 'B',
        multipleChoice: {
          a: 'James Comey',
          b: 'Michael Rogers\n',
          c: 'Edward Snowden',
          d: 'Christopher Wray',
          e: 'Mike Pompeo',
        },
      },
      A12: {
        question: '[C] What game that has many different variations has the basic goal in any form to build melds which consists of sets, three or four of a kind of the same rank; or runs, three or more cards in sequence, of the same suit?',
        answer: 'A',
        multipleChoice: {
          a: 'Rummy',
          b: 'Phase 10',
          c: 'Spades',
          d: 'Bridge',
        },
      },
      A13: {
        question: '[O] In what year did the United States last host the Olympics?',
        answer: 'C',
        multipleChoice: {
          a: '1996',
          b: '2000',
          c: '2002',
          d: '2004',
        },
      },
      A14: {
        question: '[V] Whose Voice is this?',
        answer: 'Taylor Swift',
      },
      A15: {
        question: '[E] In what city is the location of Super Bowl LII (February 4, 2018)?',
        answer: 'A',
        multipleChoice: {
          a: 'Minneapolis',
          b: 'Houston',
          c: 'Detroit',
          d: 'Los Angeles',
        },
      },
      A16: {
        question: "[R] The \"Colossus\" was the world's first electric programmable computer.  What decade was it operational?",
        answer: 'C',
        multipleChoice: {
          a: '1920s',
          b: '1930s',
          c: '1940s',
          d: '1950s',
        },
      },
      A17: {
        question: '[D] What town is the Discover UK office located?',
        answer: 'A',
        multipleChoice: {
          a: 'Farnborough',
          b: 'London',
          c: 'Liverpool',
          d: 'Sheffield',
        },
      },
      A18: {
        question: '[I] What year was the transistor invented?',
        answer: 'C',
        multipleChoice: {
          a: '1902',
          b: '1929',
          c: '1947',
          d: '1958',
        },
      },
      A19: {
        question: "[S] Mydoom, also known as W32.MyDoom@mm, Novarg, Mimail.R and \"'Shimgapi'\", is a computer worm affecting Microsoft Windows. It became the fastest-spreading e-mail worm ever, exceeding previous records set by the Sobig worm and ILOVEYOU, a record which as of 2017 has yet to be surpassed. What year released?",
        answer: 'B',
        multipleChoice: {
          a: '2002',
          b: '2004',
          c: '2008',
          d: '2013',
        },
      },
      A20: {
        question: '[C] What game has a concept called ‘Shooting the moon’ which involves trying to take all of the penalty points in a single round?',
        answer: 'Hearts',
      },
      A21: {
        question: '[O] The first 12 ancient Olympics featured 1 event - what was it?',
        answer: 'D',
        multipleChoice: {
          a: 'An eight lap chariot race',
          b: 'A wrestling competition',
          c: 'The discuss throw',
          d: 'A sprint from one end of the stadium to the other\n',
          e: 'The Javelin throw',
        },
      },
      A22: {
        question: '[V] Whose Voice is this?',
        answer: 'Robert Denrio',
      },
      A23: {
        question: '[E] The American Music Awards took place in LA a few weeks ago on November 17 - what artist/group won Artist of the Year?',
        answer: 'A',
        multipleChoice: {
          a: 'Bruno Mars',
          b: 'The Chainsmokers',
          c: 'Drake',
          d: 'Kendrick Lamar',
          e: 'Ed Sheeran',
        },
      },
      A24: {
        question: '[R] How many squares are there on a chess board?',
        answer: '64',
      },
      A25: {
        question: '[D] What was the highest PPS experienced during this past Cyber Monday? [Includes browser + mobile requests - data from Session Service]\n',
        answer: 'C',
        multipleChoice: {
          a: '800',
          b: '1500',
          c: '2000',
          d: '3000',
        },
      },
      A26: {
        question: '[I] Who is credited with inventing the World Wide Web',
        answer: 'E',
        multipleChoice: {
          a: 'Al Gore',
          b: 'Josh Bloch',
          c: 'Steve Wozniak',
          d: 'James Gosling',
          e: 'Tim Berners-Lee',
        },
      },
      A27: {
        question: '[S] From 1997 until 2013, legislation was in place limiting Secret Service protection to former Presidents and their spouses to a period of 10 years from the date the former President leaves office. What is the limit now?',
        answer: 'D',
        multipleChoice: {
          a: 'None (0 years)',
          b: '10 years',
          c: '20 years',
          d: 'Lifeteime protection',
        },
      },
      A28: {
        question: '[C] What year was Magic: The Gathering released?',
        answer: 'B',
        multipleChoice: {
          a: '1987',
          b: '1993',
          c: '1999',
          d: '2003',
        },
      },
      A29: {
        question: '[O] Shaun White is a 2 time Olympic gold medalist for the United States - In what sport?',
        answer: 'Snowboarding',
      },
      A30: {
        question: '[V] Whose voice is this?',
        answer: 'John F Kennedy',
      },
      A31: {
        question: '[E] How many kingdoms are there in the hit HBO series Game of Thrones?',
        answer: '7',
      },
      A32: {
        question: "[R] Why do we call a dollar a 'buck'?",
        answer: 'C',
        multipleChoice: {
          a: 'The first dollar was made from the skin of a male deer',
          b: "George Washington's nickname was Buck",
          c: 'In the frontier days, the pelt of a male deer was worth a dollar',
          d: 'Buck was the artist that drew the design on the first paper money',
        },
      },
      A33: {
        question: '[D] What is the minimum length required on discover.com for a password',
        answer: '8',
      },
      A34: {
        question: '[I] What year was Amazon.com founded?',
        answer: 'B',
        multipleChoice: {
          a: '1990',
          b: '1994',
          c: '1998',
          d: '2001',
        },
      },
      A35: {
        question: "[S] According to the US Bureau of Justice Statistics' 2008 Census of State and Local Law Enforcement Agencies, how many sworn police officers does the state of Illinois have per 100,000 residents?",
        answer: '',
        multipleChoice: {
          a: '123',
          b: '321',
          c: '642',
          d: '999',
        },
      },
      A36: {
        question: '[C] When playing three-card poker, what is the highest hand one can have?',
        answer: 'D',
        multipleChoice: {
          a: 'Two Pair',
          b: 'Full House',
          c: 'Three Of A Kind',
          d: 'Straight Flush',
          e: 'Royal Flush',
        },
      },
      A37: {
        question: '[O] Which of these sports has never been featured at the olympics?',
        answer: 'D',
        multipleChoice: {
          a: 'Motorcycle Racing',
          b: 'Croquet',
          c: 'Golf',
          d: 'Squash',
          e: 'Swimming obstacle race',
        },
      },
      A38: {
        question: '[V] Whose voice is this?',
        answer: 'A',
        multipleChoice: {
          a: 'Michael Richards',
          b: 'Wayne Knight',
          c: 'Larry David',
          d: 'Jason Alexander',
          e: 'Matthew Perry',
        },
      },
      A39: {
        question: '[E] Floyd Mayweather defeated Connor McGregor this past August in one of the most hyped boxing matches in years by Technical Knockout - what round was it?',
        answer: 'C',
        multipleChoice: {
          a: '1',
          b: '5',
          c: '10',
          d: '20',
        },
      },
      A40: {
        question: '[R] What is the name for the last comma used in this sentence: Steve Pritzen went to the store to buy carrots, apples, and kale.',
        answer: 'B',
        multipleChoice: {
          a: 'Optional Comma',
          b: 'Oxford Comma',
          c: 'Pritzen Phonics',
          d: 'As You Feel Like It Comma',
        },
      },
    },
  };
