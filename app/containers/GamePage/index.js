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
  getGameState,
  getCurrentRound,
  getCurrentQuestion,
  getScore,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import type {
  Answer,
 } from '../../types/FirebaseTypes';


type Props = {
  currentQuestion: string,
  // homeActions: typeof homeActions,
  gameActions: typeof gameActions,
  firebaseActions: typeof firebaseActions,
  roomCode: string,
  gameState: string,
  currentQuestion?: string,
  currentRound?: number,
  score?: Array<Answer>
}

type State = {
  answer: string
}

export class GamePage extends React.PureComponent<Props, State> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    (this: any).renderToolbar = this.renderToolbar.bind(this);
    this.state = {
      answer: '',
    };
  }

  componentDidMount() {
    this.props.firebaseActions.listenToGame(this.props.roomCode);
    this.props.firebaseActions.listenToScore(this.props.roomCode, localStorage.getItem('playerKey'));
  }

  renderToolbar() {
    let phrase;
    switch (this.props.gameState) {
      case 'LOBBY':
        phrase = 'Lobby';
        break;
      case 'IN-PROGRESS':
        phrase = `Round ${this.props.currentRound + 1}`;
        break;
      case 'COMPLETE':
        phrase = 'Game Over';
        break;
      default:
        phrase = 'Game Over';
        break;
    }
    return (
      <Toolbar>
        <div className="center">Trivia: {phrase}</div>
      </Toolbar>
    );
  }


  renderQuestion() {
    return (
      <div>
        <p style={{ paddingTop: 20 }}>
          <div>{this.props.currentQuestion}</div>
        </p>
        <p style={{ paddingTop: 20 }}>
          <Input
            modifier="material"
            float
            placeholder="Answer"
            value={this.state.answer}
            onChange={(input) => {
              this.setState({
                answer: input.target.value,
              });
            }}
            style={{ width: 200 }}
          />
        </p>
        <Button
          onClick={
            () => {
              this.props.gameActions.answerQuestion(this.props.roomCode, this.props.currentRound + 0, this.state.answer);
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
    if (this.props.score && !_.isEmpty(this.props.score) && this.props.currentRound) {
      isWaitingForNextRound = this.props.score[this.props.currentRound];
    }

    if (isWaitingForNextRound) {
      return (
        <div>
          <p>Waiting for other players to submit</p>
        </div>
      );
    }
    return (
      <div>
        <p>In Progress</p>
        {this.renderQuestion()}
      </div>
    );
  }

  renderGameOver() {
    return (
      <p>Game Over</p>
    );
  }

  renderAppropriateMode() {
    if (!this.props.gameState) {
      return null;
    }
    switch (this.props.gameState) {
      case 'LOBBY':
        return this.renderLobby();
      case 'IN-PROGRESS':
        return this.renderInProgress();
      case 'COMPLETE':
        return this.renderGameOver();
      default:
        return this.renderGameOver();
    }
  }


  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          {
            this.renderAppropriateMode()
          }
        </section>
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  gamepage: makeSelectGamePage(),
  question: () => 'Some question',
  roomCode: getRoomCode(),
  gameState: getGameState(),
  currentRound: getCurrentRound(),
  currentQuestion: getCurrentQuestion(),
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
