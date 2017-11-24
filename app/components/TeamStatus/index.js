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

type Props = {
  players: PlayerMap,
  round?: number,
  scores?: ScoreMap,
}

class TeamStatus extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function
  constructor(props: Props) {
    super(props);
    (this: any).renderTeamsAtLobby = this.renderTeamsAtLobby.bind(this);
    (this: any).renderTeamsDuringQuestions = this.renderTeamsDuringQuestions.bind(this);
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
                  <td>{this.props.players[key].playerName}</td>
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
    if (!this.props.players) {
      return <div>No players</div>;
    } else if (this.props.round !== undefined) {
      return this.renderTeamsDuringQuestions();
    }
    return this.renderTeamsAtLobby();
  }

}
export default TeamStatus;
