/**
* @flow
* Question
*
*/

import React from 'react';
import { Table } from 'react-bootstrap';

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
    const multipleChoiceKeys = Object.keys(multipleChoice);
    return (
      <div>
        <p style={{ fontSize: 60 }}>{this.props.game.currentQuestion && this.props.game.currentQuestion.question}</p>
        <div style={container}>
          <Table style={{ fontSize: 30, width: '90%' }}>
            {
            Object.keys(multipleChoice).map((key, index) => {
              if (index >= multipleChoiceKeys.length / 2) {
                return null;
              }
              const myKey = multipleChoiceKeys[index];
              const nextKey = multipleChoiceKeys[index + 2];
              return (
                <tr>
                  <td style={{ textAlign: 'left' }}>
                    {myKey}: {multipleChoice[myKey]}
                  </td>
                  <td style={{ textAlign: 'left' }}>
                    {nextKey}: {multipleChoice[nextKey]}
                  </td>
                </tr>
              );
            })}
          </Table>
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

const container = {
  // backgroundColor: 'red',
  textAlign: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
};
