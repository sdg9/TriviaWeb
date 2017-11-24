/**
 * @flow
 * ProjectorPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import type { Dispatch } from 'redux';
import { Table } from 'react-bootstrap';

import {
  getRoomCode,
  getGame,
 } from './selectors';
import reducer from './reducer';
import saga from './saga';
import GameStatus from '../../components/GameStatus';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import * as firebaseActions from '../Firebase/actions';
import type {
  Game,
 } from '../../types/FirebaseTypes';

type Props = {
  roomCode: string,
  firebaseActions: typeof firebaseActions,
  game: Game,
}

export class ProjectorPage extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    (this: any).renderLobby = this.renderLobby.bind(this);
    (this: any).renderInProgressQuestion = this.renderInProgressQuestion.bind(this);
    (this: any).renderInProgressRound = this.renderInProgressRound.bind(this);
    (this: any).renderShowScores = this.renderShowScores.bind(this);
    (this: any).renderGameOver = this.renderGameOver.bind(this);
  }

  componentDidMount() {
    const playerKey = localStorage.getItem('playerKey') || undefined;
    this.props.firebaseActions.listenToGame(this.props.roomCode);
    this.props.firebaseActions.listenToScore(this.props.roomCode, playerKey);
  }

  props: Props;

  renderLobby(playerCount: number) {
    return (
      <div>
        <p style={{ fontSize: 40 }}>Go to </p>
        <p>bmbros-trivia.firebaseapp.com</p>
        <p style={{ fontSize: 40 }}>on your mobile device to join in</p>
        <p><span style={{ fontSize: 40 }}>using room code</span> {this.props.roomCode}</p>
        <p>Teams: {playerCount}</p>
      </div>
    );
  }

  renderInProgressRound() {
    return (
      <div>
        <p>Round {this.props.game.round + 1}</p>
      </div>
    );
  }
  renderInProgressQuestion(playerCount: boolean, submittedCount: boolean) {
    return (
      <div>
        <p>{this.props.game.currentQuestion && this.props.game.currentQuestion.question}</p>
        <p>Teams ready: {submittedCount}/{playerCount}</p>
        <p style={{ paddingTop: 40, fontSize: 40 }}>Room code: {this.props.roomCode}</p>
      </div>
    );
  }

  renderShowScores(scores: {[key: string]: string}) {
    return (
      <div>
        Final Scores
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              scores && Object.keys(scores).map((key, index) => (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{key}</td>
                  <td>{scores[key]}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
  renderGameOver() {
    return (
      <div>
        <p
          style={{
            fontSize: 80,
          }}
        >Game Over
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <section
          style={{
            paddingTop: 200,
            fontSize: 80,
            textAlign: 'center',
          }}
        >
          <GameStatus
            game={this.props.game}
            renderLobby={this.renderLobby}
            renderInProgressQuestion={this.renderInProgressQuestion}
            renderInProgressRound={this.renderInProgressRound}
            renderShowScores={this.renderShowScores}
            renderGameOver={this.renderGameOver}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  roomCode: getRoomCode(),
  game: getGame(),
});

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'projectorPage', reducer });
const withSaga = injectSaga({ key: 'projectorPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectorPage);
