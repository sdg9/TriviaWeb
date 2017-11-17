/**
* @flow
* GameListItem
*
*/

import React from 'react';
// import styled from 'styled-components';

import type { Game } from '../../types/FirebaseTypes';

type Props = {
  game?: Game
}

class GameListItem extends React.PureComponent<Props> { // eslint-disable-line react/prefer-stateless-function
  props: Props;
  render() {
    if (!this.props.game) {
      return <div></div>;
    }
    return (
      <div>
        <div>
          {this.props.game.status}
        </div>
        <div>
          {Object.keys(this.props.game.players).length}
        </div>
      </div>
    );
  }
}

export default GameListItem;
