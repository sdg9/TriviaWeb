/**
* @flow
* GameListItem
*
*/

import React from 'react';
// import styled from 'styled-components';

import type { Game } from '../../types/FirebaseTypes';

type Props = {
  game?: Game,
  roomCode: string,
  onClick?: Function,
}

const getPlayerCount = (players) => players ? Object.keys(players).length : 0;

class GameListItem extends React.PureComponent<Props> { // eslint-disable-line react/prefer-stateless-function
  props: Props;
  render() {
    if (!this.props.game) {
      return null;
    }
    const { game } = this.props;

    return (
      <tr onClick={this.props.onClick}>
        <td>{this.props.roomCode}</td>
        <td>{getPlayerCount(game.players)}</td>
        <td>{game.status}</td>
        <td>{game.round}</td>
      </tr>
    );
  }
}

export default GameListItem;
