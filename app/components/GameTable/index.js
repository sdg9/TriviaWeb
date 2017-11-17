/**
* @flow
* GameTable
*
*/

import React from 'react';

import { Table } from 'react-bootstrap';

import GameListItem from '../GameListItem';

import type { GameMap } from '../../types/FirebaseTypes';

type Props = {
  games?: GameMap,
  onClick?: Function
}
class GameTable extends React.PureComponent<Props> { // eslint-disable-line react/prefer-stateless-function
  props: Props;

  render() {
    if (!this.props.games) {
      return <div>No games</div>;
    }
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Room Code</th>
            <th>Player Count</th>
            <th>Status</th>
            <th>Round</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(this.props.games).map((key) => (
              <GameListItem
                key={key}
                roomCode={key}
                game={this.props.games && this.props.games[key]}
                onClick={() => {
                  if (this.props.onClick) {
                    this.props.onClick(key);
                  }
                }}
              />
            ))
          }
        </tbody>
      </Table>
    );
  }
}

export default GameTable;
