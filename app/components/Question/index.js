/**
* @flow
* Question
*
*/

import React from 'react';

import type {
  Game,
} from '../../types/FirebaseTypes';

type Props = {
  game: Game,
}

class Question extends React.Component<Props> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    (this: any).renderMultipleChoice = this.renderMultipleChoice.bind(this);
    (this: any).renderFillInTheBlank = this.renderFillInTheBlank.bind(this);
  }

  props: Props;

  renderMultipleChoice() {
    const multipleChoice = this.props.game.currentQuestion && this.props.game.currentQuestion.multipleChoice;
    if (!multipleChoice) {
      return null;
    }
    return (
      <div>
        <p style={{ fontSize: 60 }}>{this.props.game.currentQuestion && this.props.game.currentQuestion.question}</p>
        <div >
          {Object.keys(multipleChoice).map((key) => (
            <p
              style={{
                fontSize: 30,
                display: 'flex',
                paddingLeft: 30,
              }}
            >{key}: {multipleChoice[key]}</p>
        ))}
        </div>
      </div>
    );
  }

  renderFillInTheBlank() {
    return (
      <div>
        <p style={{ fontSize: 80 }}>{this.props.game.currentQuestion && this.props.game.currentQuestion.question}</p>
      </div>
    );
  }

  render() {
    if (this.props.game.currentQuestion && this.props.game.currentQuestion.multipleChoice) {
      return this.renderMultipleChoice();
    }
    return this.renderFillInTheBlank();
  }

}

export default Question;
