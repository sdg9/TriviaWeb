/**
* @flow
* GameStatus
*
*/

import React from 'react';
import type {
  Game,
 } from '../../types/FirebaseTypes';

type Props = {
  game: Game,
  renderLobby: (playerCount?: number) => void,
  renderInProgress: (playerCount?: number, lastRound?: boolean) => void,
  renderGameOver: () => void,
}

const getPlayerCount = (players) => players ? Object.keys(players).length : 0;

class GameStatus extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function

  props: Props;

  render() {
    if (!this.props.game) {
      return null;
    }
    switch (this.props.game.status) {
      case 'LOBBY': {
        const { game } = this.props;
        const playerCount = getPlayerCount(game.players);
        return this.props.renderLobby(playerCount);
      }
      case 'IN-PROGRESS': {
        const { game } = this.props;
        const playerCount = getPlayerCount(game.players);
        const lastRound = game.questions.length === (game.round + 1);

        return this.props.renderInProgress(playerCount, lastRound);
      }
      case 'COMPLETE':
        return this.props.renderGameOver();
      default:
        return this.props.renderGameOver();
    }
  }
}

GameStatus.propTypes = {

};

export default GameStatus;
