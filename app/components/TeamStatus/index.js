/**
* @flow
* TeamStatus
*
*/

import React from 'react';
import _ from 'lodash';

import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import type {
  PlayerMap,
  ScoreMap,
} from '../../types/FirebaseTypes';

import type { GameStatusScore } from '../../components/GameStatus';

type Props = {
  players: PlayerMap,
  round?: number,
  scores?: ScoreMap,
  scorePoints?: Array<GameStatusScore>;
}

class TeamStatus extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function
  constructor(props: Props) {
    super(props);
    (this: any).renderTeamsAtLobby = this.renderTeamsAtLobby.bind(this);
    (this: any).renderTeamsDuringQuestions = this.renderTeamsDuringQuestions.bind(this);
    (this: any).renderTeamsAtRound = this.renderTeamsAtRound.bind(this);
  }

  props: Props;

  renderTeamsDuringQuestions() {
    // Does not get mad at people not focused.
    return (
      <Table
        striped
        bordered
        condensed
        hover
      >
        <tbody>
          {
              Object.keys(this.props.players).map((key) => {
                const isPlayerFocused = this.props.players[key].isFocused;
                const round = (this.props.round && this.props.round.toString(10)) || '0';
                const playerAnswer = _.get(this.props.scores, [key, round]);
                const isPlayerDone = !_.isEmpty(playerAnswer);
                return (
                  <tr
                    style={{ backgroundColor: isPlayerDone || isPlayerFocused ? undefined : '#fb8686' }}
                  >
                    <td
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 20,
                      }}
                    >{isPlayerDone &&
                      <FontAwesome
                        name="check"
                        style={{ color: 'green', paddingRight: 5 }}
                        size="2x"
                      />} {this.props.players[key].playerName}</td>
                  </tr>
                );
              }
            )
          }
        </tbody>
      </Table>
    );
  }

  renderTeamsAtRound() {
    const scores = this.props.scorePoints;
    let previousScore = 0;
    let previousRank = 0;
    return (
      <div style={{ fontSize: 30 }}>
      Current Scores
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Previous Round</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {
            scores && scores.map((value, index) => {
              let rank = index;
              if (value.points === previousScore) {
                rank = previousRank;
              } else {
                previousRank = index;
                previousScore = value.points;
              }
              const isPlayerFocused = this.props.players[value.playerKey].isFocused;
              return (
                <tr
                  key={value.playerName}
                  style={{ backgroundColor: isPlayerFocused ? undefined : '#fb8686' }}
                >
                  <td>{rank + 1}</td>
                  <td>{value.playerName}</td>
                  <td>{value.lastAnswerCorrect ?
                    <FontAwesome
                      name="check"
                      style={{ color: 'green' }}
                      size="2x"
                    /> :
                    <FontAwesome
                      name="close"
                      style={{ color: 'red' }}
                      size="2x"
                    />} </td>
                  <td>{value.points}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      </div>
    );
  }

  renderTeamsAtLobby() {
    return (
      <Table
        striped
        bordered
        condensed
        hover
      >
        <tbody>
          {
            Object.keys(this.props.players).map((key) => {
              const isPlayerFocused = this.props.players[key].isFocused;
              return (
                <tr
                  style={{ backgroundColor: isPlayerFocused ? undefined : '#fb8686' }}
                >
                  <td style={{ fontSize: 20 }}>{this.props.players[key].playerName}</td>
                </tr>
              );
            }
          )
        }
        </tbody>
      </Table>
    );
  }

  render() {
    if (this.props.scorePoints) {
      return this.renderTeamsAtRound();
    } else if (!this.props.players) {
      return null;
    } else if (this.props.round !== undefined) {
      return this.renderTeamsDuringQuestions();
    }
    return this.renderTeamsAtLobby();
  }

}
export default TeamStatus;
