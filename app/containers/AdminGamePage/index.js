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

const getPlayerCount = (players) => players ? Object.keys(players).length : 0;

export class AdminGamePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (_.isEmpty(this.props.allGames)) {
      this.props.firebaseActions.listenToAllGames();
    }
  }

  props: Props;

  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Admin Game</div>
      </Toolbar>
    );
  }

  renderLobby() {
    const { game } = this.props;
    const playerCount = getPlayerCount(game.players);
    return (
      <div>
        <p>Players: {playerCount}</p>
        <Button
          onClick={
            () => {
              this.props.adminActions.startGame(this.props.roomCode);
            }
          }
        >Start Game</Button>
      </div>
    );
  }

  renderInProgress() {
    const { game } = this.props;
    const playerCount = getPlayerCount(game.players);
    const lastRound = game.questions.length === (game.round + 1);

    return (
      <div>
        <p style={{ fontSize: 40 }}>{game.currentQuestion.question}</p>
        <p>Waiting on: 0/{playerCount}</p>
        { !lastRound ?
          <Button
            onClick={
              () => {
                this.props.adminActions.advanceRound(this.props.roomCode);
              }
            }
          >Advance Round</Button>
          :
          <Button
            onClick={
              () => {
                this.props.adminActions.endGame(this.props.roomCode);
              }
            }
          >Finish Game</Button>
        }
      </div>
    );
  }

  renderGameOver() {
    return (
      <div>
        <div>
        Game Over
        </div>
        <Button
          onClick={
            () => {
              this.props.push('/admin');
            }
          }
        >Back to Admin Portal</Button>
      </div>
    );
  }

  renderAppropriateMode() {
    if (!this.props.game) {
      return null;
    }
    switch (this.props.game.status) {
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

          {this.renderAppropriateMode()}
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
