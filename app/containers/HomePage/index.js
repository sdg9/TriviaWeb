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
import ons from 'onsenui';

type State = {
  teamName: string,
  roomCode: string,
}
export default class HomePage extends React.PureComponent<void, State> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: void) {
    super(props);
    this.state = {
      teamName: '',
      roomCode: '',
    };
    (this: any).handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
    (this: any).handleTeamNameChange = this.handleTeamNameChange.bind(this);
  }

  handleTeamNameChange(e: SyntheticInputEvent<*>) {
    this.setState({ teamName: e.target.value });
  }

  handleRoomCodeChange(e: SyntheticInputEvent<*>) {
    this.setState({ roomCode: e.target.value });
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
          <p>
            <Input
              modifier="underbar"
              float
              placeholder="Team Name"
              value={this.state.teamName}
              onChange={this.handleTeamNameChange}
            />
          </p>
          <p>
            <Input
              modifier="underbar"
              float
              placeholder="Game Room Code"
              value={this.state.roomCode}
              onChange={this.handleRoomCodeChange}
            />
          </p>
          <Button
            onClick={
            () => {
              ons.notification.alert('Hello world!');
            }
          }
          >Join</Button>
        </section>
      </Page>
    );
  }
}
