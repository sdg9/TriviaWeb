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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import type { Dispatch } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as homeActions from '../HomePage/actions';
import * as firebaseActions from '../Firebase/actions';
import {
  makeSelectGamePage,
  getRoomCode,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

type Props = {
  question: string,
  homeActions: typeof homeActions,
  firebaseActions: typeof firebaseActions,
  roomCode: string,
}

type State = {
  answer: string
}

export class GamePage extends React.PureComponent<Props, State> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  componentDidMount() {
    console.log('My game: ', this.props.roomCode);
    this.props.firebaseActions.listenToGame(this.props.roomCode);
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Trivia: Round 1</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          <p style={{ paddingTop: 20 }}>
            <div>{this.props.question}</div>
          </p>
          <p style={{ paddingTop: 20 }}>
            <Input
              modifier="material"
              float
              placeholder="Answer"
              value={this.state.answer}
              style={{ width: 200 }}
            />
          </p>
          <Button
            onClick={
              () => {
                // this.props.homeActions.joinGame(this.state.roomCode, this.state.teamName);
                this.props.homeActions.joinGame('1234', 'Me2');
              }
            }
          >Submit Answer</Button>
        </section>
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  gamepage: makeSelectGamePage(),
  question: () => 'Some question',
  roomCode: getRoomCode(),
});

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}
// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'gamePage', reducer });
const withSaga = injectSaga({ key: 'gamePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GamePage);
