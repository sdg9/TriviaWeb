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
import PageVisibility from 'react-page-visibility';
import { push } from 'react-router-redux';
import ons from 'onsenui';
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

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
  push: typeof push,
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
  answer: string,
  visible: boolean,
  width: number,
  height: number,
}

export class GamePage extends React.Component<Props, State> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    (this: any).renderToolbar = this.renderToolbar.bind(this);
    (this: any).renderLobby = this.renderLobby.bind(this);
    (this: any).renderInProgressQuestion = this.renderInProgressQuestion.bind(this);
    (this: any).renderInProgressRound = this.renderInProgressRound.bind(this);
    (this: any).renderGameOver = this.renderGameOver.bind(this);
    (this: any).handleVisibilityChange = this.handleVisibilityChange.bind(this);
    (this: any).renderInput = this.renderInput.bind(this);
    (this: any).updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.state = {
      visible: true,
      answer: '',
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const playerKey = localStorage.getItem('playerKey') || undefined;
    this.props.firebaseActions.listenToGame(this.props.roomCode);
    this.props.firebaseActions.listenToScore(this.props.roomCode, playerKey);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.game.status !== this.props.game.status) {
      this.setState({ answer: undefined });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  handleVisibilityChange(visibilityState: string, documentHidden: boolean) {
    this.setState({ visible: !documentHidden });
    this.props.gameActions.setFocus(this.props.roomCode, !documentHidden);
  }

  renderToolbar() {
    const status = (<GameStatus
      game={this.props.game}
      renderLobby={() => <span>Lobby</span>}
      renderInProgressQuestion={() => <span>Question {this.props.currentRound + 1}</span>}
      renderInProgressRound={() => <span>Question {this.props.currentRound + 1}</span>}
      renderGameOver={() => <span>Game Over</span>}
    />);
    return (
      <Toolbar>
        <div className="center">Trivia: {status}</div>
      </Toolbar>
    );
  }

  renderInput() {
    if (this.props.game.currentQuestion && this.props.game.currentQuestion.multipleChoice) {
      const multipleChoice = this.props.game.currentQuestion.multipleChoice;
      return (
        <p style={{ paddingTop: 20 }}>
          <ButtonToolbar>
            <ToggleButtonGroup
              vertical
              type="radio"
              name="options"
              onChange={(value) => {
                this.setState({
                  answer: value.toUpperCase(),
                });
              }}
            >
              {
              Object.keys(multipleChoice).map((key) => (
                <ToggleButton
                  bsSize="large"
                  value={key}
                >{key}: {multipleChoice[key]}</ToggleButton>
              ))
            }
            </ToggleButtonGroup>
          </ButtonToolbar>
        </p>
      );
    }
    return (
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
    );
  }

  renderQuestion() {
    return (
      <div>
        <p style={{ paddingTop: 20 }}>
          {this.props.currentQuestion}
        </p>
        { this.renderInput() }
        <Button
          style={{ marginTop: 50 }}
          onClick={
            () => {
              if (!this.state.answer) {
                ons.notification.alert('Please provide an answer.');
              } else {
                this.props.gameActions.answerQuestion(this.props.roomCode, this.props.currentRound + 0, this.state.answer);
                this.setState({
                  answer: undefined,
                });
              }
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

  renderInProgressRound() {
    return (
      <p
        style={{
          marginTop: 30,
          fontSize: 30,
        }}
      >Waiting for question</p>
    );
  }

  renderInProgressQuestion() {
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
      <div>
        <p>Game Over</p>
        <Button
          onClick={() => this.props.push('/')}
        >Back to Home</Button>
      </div>
    );
  }

  render() {
    return (
      <PageVisibility onChange={this.handleVisibilityChange}>
        <Page renderToolbar={this.renderToolbar}>
          <section style={{ ...container, height: this.state.height - 100 }}>
            <GameStatus
              game={this.props.game}
              renderLobby={this.renderLobby}
              renderInProgressQuestion={this.renderInProgressQuestion}
              renderInProgressRound={this.renderInProgressRound}
              renderGameOver={this.renderGameOver}
            />
          </section>
        </Page>
      </PageVisibility>
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
    push: bindActionCreators(push, dispatch),
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

const container = {
  textAlign: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
};
