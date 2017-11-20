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
    (this: any).renderInProgress = this.renderInProgress.bind(this);
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
        <p>trivia.wsguede.com </p>
        <p style={{ fontSize: 40 }}>on your mobile device to join in</p>
        <p><span style={{ fontSize: 40 }}>using room code</span> {this.props.roomCode}</p>
        <p>Teams: {playerCount}</p>
      </div>
    );
  }

  renderInProgress(playerCount: boolean) {
    return (
      <div>
        <p>{this.props.game.currentQuestion && this.props.game.currentQuestion.question}</p>
        <p>Waiting on: 0/{playerCount}</p>
        <p style={{ paddingTop: 40, fontSize: 40 }}>Room code: {this.props.roomCode}</p>
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
            renderInProgress={this.renderInProgress}
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
