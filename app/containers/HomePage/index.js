/*
 * @flow
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {
  Input,
  Page,
  Toolbar,
  Button,
} from 'react-onsenui';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import * as homeActions from './actions';
import reducer from './reducer';
import saga from './saga';

type Props = {
  homeActions: typeof homeActions
}

type State = {
  teamName: string,
  roomCode: string,
}

class HomePage extends React.PureComponent<Props, State> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    this.state = {
      teamName: '',
      roomCode: '',
    };
    (this: any).handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
    (this: any).handleTeamNameChange = this.handleTeamNameChange.bind(this);
  }

  handleTeamNameChange(e: SyntheticInputEvent<*>) {
    this.setState({ teamName: e.target.value.toUpperCase() });
  }

  handleRoomCodeChange(e: SyntheticInputEvent<*>) {
    this.setState({ roomCode: e.target.value.toUpperCase() });
  }


  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Trivia</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          <p style={{ paddingTop: 20 }}>
            <Input
              modifier="material"
              float
              placeholder="ENTER 4-LETTER CODE"
              value={this.state.roomCode}
              onChange={this.handleRoomCodeChange}
              style={{ width: 200 }}
              maxlength="4"
            />
          </p>
          <p style={{ paddingTop: 20 }}>
            <Input
              modifier="material"
              float
              placeholder="ENTER TEAM NAME"
              label="test"
              value={this.state.teamName}
              onChange={this.handleTeamNameChange}
              maxlength="12"
              style={{ width: 200 }}
            />
          </p>
          <Button
            onClick={
            () => {
              this.props.homeActions.joinGame(this.state.roomCode, this.state.teamName);
            }
          }
          >Join</Button>
        </section>
      </Page>
    );
  }
}


const mapStateToProps = createStructuredSelector({
});

// const mapStateToProps =
export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
