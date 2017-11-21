/**
* @flow
* ScoreTable
*
*/

import React from 'react';
import {
  Table,
  Checkbox,
 } from 'react-bootstrap';
import _ from 'lodash';

import {
  overrideResponseAsCorrect,
} from '../../utils/firebase';
import type {
  Game,
 } from '../../types/FirebaseTypes';

type Props = {
  game: Game,
  roomCode: string,
}

export default class ScoreTable extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function
  props: Props;

  render() {
    const gameRound = _.get(this.props.game, 'round', 0) + 1;
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Team</th>
              <th>Answer</th>
              <th>Correct?</th>
              <th>Override</th>
            </tr>
          </thead>
          <tbody>
            {
            this.props.game && this.props.game.round !== undefined && _.range(gameRound).map((round) => {
              const Rows = [];
              const { answer } = this.props.game.questions[round];
              Rows.push(<tr>
                <td style={{ fontWeight: 'bold' }}>Round {round}</td>
                <td style={{ fontWeight: 'bold' }}>{answer}</td>
                <td colSpan="2"></td>
              </tr>);
              const MoreRows = this.props.game.scores && Object.keys(this.props.game.scores).map((playerKey) => (
                <Row
                  key={`Row${playerKey}`}
                  game={this.props.game}
                  playerKey={playerKey}
                  round={round.toString(10)}
                  onChange={(value) => {
                    overrideResponseAsCorrect(this.props.roomCode, playerKey, round, value);
                      // console.log(value);
                  }}
                />
                ));
              Rows.push(MoreRows);
              return Rows;
            })
          }
          </tbody>
        </Table>

      </div>
    );
  }
}

type RowProps = {
  game: Game,
  playerKey: string,
  round: string,
  onChange: Function,
}

const Row = (props: RowProps) => {
  if (!props.game) {
    return null;
  }
  const { playerKey, game, round } = props;
  const { players, scores } = game;

  const isCorrectAdminOverride = _.get(scores, [playerKey, round, 'isCorrectAdminOverride']);

  return (<tr key={round}>
    <td>{players[playerKey].playerName}</td>
    <td>{_.get(scores, [playerKey, round, 'response'])}</td>
    <td>{_.get(scores, [playerKey, round, 'isCorrect']) ? 'true' : 'false'}</td>
    <td>
      <Checkbox
        onChange={(evt) => props.onChange && props.onChange(evt.target.checked)}
        checked={isCorrectAdminOverride}
      >
        Mark as correct
      </Checkbox>
    </td>
  </tr>
  );
};
