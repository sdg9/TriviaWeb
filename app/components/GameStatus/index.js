/**
* @flow
* GameStatus
*
*/

import React from 'react';
import _ from 'lodash';
import {
  LOBBY,
  IN_PROGRESS_ROUND,
  IN_PROGRESS_QUESTION,
  COMPLETE,
} from '../../types/FirebaseTypes';
import type {
  Game,
  ScoreMap,
  PlayerMap,
  Answer,
 } from '../../types/FirebaseTypes';

type Props = {
  game: Game,
  // renderLobby: (playerCount?: number) => void,
  // renderInProgress: (playerCount?: number, lastRound?: boolean) => void,
  // renderGameOver: () => void,
  renderLobby: Function,
  renderInProgress: Function,
  renderGameOver: Function,
}

const getPlayerCount = (players) => players ? Object.keys(players).length : 0;

class GameStatus extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function

  props: Props;

  render() {
    if (!this.props.game) {
      return null;
    }
    switch (this.props.game.status) {
      case LOBBY: {
        const { game } = this.props;
        const playerCount = getPlayerCount(game.players);
        return this.props.renderLobby(playerCount);
      }
      case IN_PROGRESS_ROUND: {
        const { game } = this.props;
        const playerCount = getPlayerCount(game.players);
        const lastRound = game.questions.length === (game.round + 1);

        return this.props.renderInProgressRound(playerCount, lastRound);
      }
      case IN_PROGRESS_QUESTION: {
        const { game } = this.props;
        const playerCount = getPlayerCount(game.players);
        const lastRound = game.questions.length === (game.round + 1);
        const submittedCount = getSubmittedCount(game.scores, game.round);

        return this.props.renderInProgressQuestion(playerCount, submittedCount, lastRound);
      }
      case COMPLETE:
        return this.props.renderGameOver();
      default:
        return this.props.renderGameOver();
    }
  }
}

GameStatus.propTypes = {

};

export default GameStatus;
