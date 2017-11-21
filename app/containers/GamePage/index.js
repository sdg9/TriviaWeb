/**
 * @flow
 * GamePage
 *
 */

import React from 'react';
import {
  Input,
  Page,
  Toolbar,
  Button,
} from 'react-onsenui';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import type { Dispatch } from 'redux';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
// import * as homeActions from '../HomePage/actions';
import * as gameActions from './actions';
import * as firebaseActions from '../Firebase/actions';
import {
  makeSelectGamePage,
  getRoomCode,
  getCurrentRound,
  getCurrentQuestion,
  getScore,
  getGame,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import type {
  Answer,
  Game,
 } from '../../types/FirebaseTypes';
import GameStatus from '../../components/GameStatus';


type Props = {
  game: Game,
  currentQuestion: string,
  // homeActions: typeof homeActions,
  gameActions: typeof gameActions,
  firebaseActions: typeof firebaseActions,
  roomCode: string,
  currentQuestion?: string,
  currentRound?: number,
  score?: Array<Answer>
}

type State = {
  answer: string
}

export class GamePage extends React.Component<Props, State> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    (this: any).renderToolbar = this.renderToolbar.bind(this);
    (this: any).renderLobby = this.renderLobby.bind(this);
    (this: any).renderInProgress = this.renderInProgress.bind(this);
    (this: any).renderGameOver = this.renderGameOver.bind(this);
    this.state = {
      answer: '',
    };
  }

  componentDidMount() {
    const playerKey = localStorage.getItem('playerKey') || undefined;
    this.props.firebaseActions.listenToGame(this.props.roomCode);
    this.props.firebaseActions.listenToScore(this.props.roomCode, playerKey);
  }

  renderToolbar() {
    const status = (<GameStatus
      game={this.props.game}
      renderLobby={() => <span>Lobby</span>}
      renderInProgress={() => <span>Round {this.props.currentRound + 1}</span>}
      renderGameOver={() => <span>Game Over</span>}
    />);
    return (
      <Toolbar>
        <div className="center">Trivia: {status}</div>
      </Toolbar>
    );
  }


  renderQuestion() {
    return (
      <div>
        <p style={{ paddingTop: 20 }}>
          {this.props.currentQuestion}
        </p>
        <p style={{ paddingTop: 20 }}>
          <Input
            modifier="material"
            float
            placeholder="Answer"
            value={this.state.answer}
            onChange={(input) => {
              this.setState({
                answer: input.target.value.toUpperCase(),
              });
            }}
            style={{ width: 200 }}
          />
        </p>
        <Button
          style={{ marginTop: 50 }}
          onClick={
            () => {
              this.props.gameActions.answerQuestion(this.props.roomCode, this.props.currentRound + 0, this.state.answer);
              this.setState({
                answer: undefined,
              });
            }
          }
        >Submit Answer</Button>
      </div>
    );
  }

  renderLobby() {
    return (
      <p style={{ fontSize: 30 }}>Waiting for all players to join</p>
    );
  }

  renderInProgress() {
    let isWaitingForNextRound = false;
    if (this.props.score && !_.isEmpty(this.props.score) && this.props.currentRound !== undefined) {
      isWaitingForNextRound = this.props.score[this.props.currentRound];
    }

    if (isWaitingForNextRound) {
      return (
        <p
          style={{
            marginTop: 30,
            fontSize: 30,
          }}
        >Waiting for next round</p>
      );
    }
    return this.renderQuestion();
  }

  renderGameOver() {
    return (
      <p>Game Over</p>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          <GameStatus
            game={this.props.game}
            renderLobby={this.renderLobby}
            renderInProgress={this.renderInProgress}
            renderGameOver={this.renderGameOver}
          />
        </section>
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  gamepage: makeSelectGamePage(),
  question: () => 'Some question',
  roomCode: getRoomCode(),
  currentRound: getCurrentRound(),
  currentQuestion: getCurrentQuestion(),
  game: getGame(),
  score: getScore(),
});

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'gamePage', reducer });
const withSaga = injectSaga({ key: 'gamePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GamePage);
