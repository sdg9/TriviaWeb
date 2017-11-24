// @flow

type GameKey = string;
type QuestionnaireKey = string;
type GameStatus = 'LOBBY' | 'IN-PROGRESS' | 'COMPLETE';
type PlayerKey = string;
type QuestionKey = string;

type QuestionsMap = { [key: QuestionKey]: Question };

export type ThenableWithKey = Promise<Key>;
export type Key = { key: string };

export type PlayersAnswers = {
  [key: PlayerKey]: {
    answers: Array<Answer>
  }
}

export type Player = {
  name: string,
  mostRecentGame?: GameKey,
};

export type PlayerMap = {
  [key: PlayerKey]: {
    isConnected: boolean,
    lastHealthCheck: string, // iso date
    playerName: string
  }
}

export type GameMap = { [key: GameKey]: Game };

export type Game = {
  status: GameStatus,
  questionnaire: QuestionnaireKey,
  questions: Array<Question>,
  round?: number,
  currentQuestion?: Question,
  players: PlayerMap,
  scores?: {
    [key: PlayerKey]: Answer
  }
}

export type Question = {
  question: string,
  answer: string,
  // type: 'MULTIPLE-CHOICE' | 'FREEHAND',
  options?: Array<string>,
  image?: string,
  key?: string,
  points: number
}

export type Answer = {
  response: string,
  isCorrect?: boolean,
  isCorrectAdminOverride?: boolean,
  originalQuestion?: Question
}
//
// export type ScoreBoard = {
//   questionnaire: QuestionnaireKey,
//   roundsScored: number,
//   scores: {
//     [key: PlayerKey]: number
//   },
//   players: PlayersAnswers
// }

export type QuestionnaireMap = { [key: GameKey]: Questionnaire };
export type Questionnaire = Array<QuestionKey>;

export type Scheme = {
  players: {
    [key: PlayerKey]: Player
  },
  games: GameMap,
  questionnaires: QuestionnaireMap,
  questions: QuestionsMap,
  // scores: {
  //   [key: GameKey]: ScoreBoard
  // }
}
