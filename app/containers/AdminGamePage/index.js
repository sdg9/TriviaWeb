/**
 *
 * AdminGamePage
 *
 */

import React from 'react';
import {
  Page,
  Toolbar,
  Button,
} from 'react-onsenui';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { push } from 'react-router-redux';
import type { Dispatch } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import {
  getRoomCode,
  getSelectedGame,
} from './selectors';
import * as adminActions from './actions';

import GameStatus from '../../components/GameStatus';
import ScoreTable from '../../components/ScoreTable';
import * as firebaseActions from '../Firebase/actions';
import type {
  Game,
  GameMap,
 } from '../../types/FirebaseTypes';
import {
  getAllGames,
} from '../AdminPage/selectors';

type Props = {
  firebaseActions: typeof firebaseActions,
  adminActions: typeof adminActions,
  roomCode: string,
  game: Game,
  push: typeof push,
  allGames?: GameMap,
}


export class AdminGamePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    (this: any).renderLobby = this.renderLobby.bind(this);
    (this: any).renderToolbar = this.renderToolbar.bind(this);
    (this: any).renderInProgressRound = this.renderInProgressRound.bind(this);
    (this: any).renderInProgressQuestion = this.renderInProgressQuestion.bind(this);
    (this: any).renderGameOver = this.renderGameOver.bind(this);
  }
  componentDidMount() {
    if (_.isEmpty(this.props.allGames)) {
      this.props.firebaseActions.listenToAllGames();
    }
  }

  props: Props;

  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Admin Game: {this.props.roomCode}</div>
      </Toolbar>
    );
  }

  renderLobby(playerCount) {
    return (
      <div>
        <p>Waiting for game to start</p>
        <p>Teams: {playerCount}</p>
        <Button
          onClick={() => this.props.adminActions.startGame(this.props.roomCode)}
        >Start Game</Button>
      </div>
    );
  }

  renderInProgressRound(scores, isLastRound: boolean) {
    return (
      <div>
        <p>Question {this.props.game.round}</p>
        {
          !isLastRound ?
            <Button
              onClick={() => this.props.adminActions.advanceRound(this.props.roomCode)}
            >Advance To Question</Button>
          :
            <Button
              onClick={() => this.props.adminActions.advanceRound(this.props.roomCode)}
            >Advance to Final Question</Button>
        }
      </div>
    );
  }

  renderInProgressQuestion(playerCount: number, submittedCount: number, isLastRound: boolean) {
    return (
      <div>
        <p>{this.props.game.currentQuestion.question}</p>
        <p>Teams ready: {submittedCount}/{playerCount}</p>
        {
          !isLastRound ?
            <Button
              onClick={() => this.props.adminActions.advanceRound(this.props.roomCode)}
            >Advance Question</Button>
          :
            <Button
              onClick={() => this.props.adminActions.endGame(this.props.roomCode)}
            >Finish Game</Button>
        }
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
        <Button
          onClick={() => this.props.adminActions.advanceRound(this.props.roomCode)}
        >{this.props.game.status === 'SHOW-SCORES' ? 'Toggle Game Over' : 'Toggle Scores'}</Button>
        <p></p>
        <Button
          onClick={() => this.props.push('/admin')}
        >Back to Admin Portal</Button>
      </div>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          <a href={`../../projector/${this.props.roomCode}`} target="_blank">Projector View</a>
          <ScoreTable
            roomCode={this.props.roomCode}
            game={this.props.game}
          />

          <div
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <GameStatus
              game={this.props.game}
              renderLobby={this.renderLobby}
              renderInProgressQuestion={this.renderInProgressQuestion}
              renderInProgressRound={this.renderInProgressRound}
              renderGameOver={this.renderGameOver}
            />
            <Button
              onClick={() => {
                this.props.adminActions.toggleScoreVisibilty(this.props.roomCode);
              }}
              style={{ marginTop: 30, marginLeft: '30%' }}
            >Toggle Scores: (Currently {this.props.game.displayScoresOnProjector ? 'Visible' : 'Not Visible'})</Button>
          </div>
        </section>
      </Page>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  roomCode: getRoomCode(),
  game: getSelectedGame(),
  allGames: getAllGames(),
});

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    adminActions: bindActionCreators(adminActions, dispatch),
    push: bindActionCreators(push, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminGamePage', reducer });
const withSaga = injectSaga({ key: 'adminGamePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminGamePage);
