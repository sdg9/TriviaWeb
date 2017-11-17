/**
 * @flow
 * AdminPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import type { Dispatch } from 'redux';
import {
  Page,
  Toolbar,
  Button,
} from 'react-onsenui';
import {
  FormGroup,
  ControlLabel,
  FormControl,
 } from 'react-bootstrap';

import {
  makeSelectQuestionnaire,
  getAllGames,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import GameTable from '../../components/GameTable';
import * as firebaseActions from '../Firebase/actions';
import * as adminActions from './actions';
import type {
  GameMap,
  QuestionnaireMap,
 } from '../../types/FirebaseTypes';

type Props = {
  firebaseActions: typeof firebaseActions,
  adminActions: typeof adminActions,
  allGames?: GameMap,
  questionnaire: QuestionnaireMap,
}

type State = {
}

export class AdminPage extends React.PureComponent<Props, State> { // eslint-disable-line react/prefer-stateless-function

  constructor(props: Props) {
    super(props);
    (this: any).renderCreateGameControl = this.renderCreateGameControl.bind(this);
    this.state = {
    };
    // (this: any).handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
  }

  state: State;

  componentDidMount() {
    this.props.firebaseActions.listenToAllGames();
    this.props.adminActions.getQuestionnaires();
  }

  props: Props;

  questionnaireSelection: Object;

  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">Admin Portal</div>
      </Toolbar>
    );
  }


  renderCreateGameControl() {
    return (
      <div>
        <FormGroup controlId="formControlsSelect" style={{ width: 200 }} inline>
          <ControlLabel>Questionnaire</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            inputRef={(input) => { this.questionnaireSelection = input; }}
          >
            { this.props.questionnaire && Object.keys(this.props.questionnaire).map((key) => (
              <option
                key={key}
                value={key}
              >
                {key}
              </option>
            ))
          }
          </FormControl>
          <Button
            onClick={() => {
              const questionnaire = this.questionnaireSelection.value;
              this.props.adminActions.createGame(questionnaire);
            }}
          >Create Game</Button>
        </FormGroup>

      </div>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          { this.renderCreateGameControl() }
          <GameTable
            games={this.props.allGames}
            onClick={(roomCode) => {
              // TODO Story/Issue #11
              // eslint-disable-next-line
              console.log('Pressed game with roomCode: ', roomCode);
            }}
          />
        </section>
      </Page>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  questionnaire: makeSelectQuestionnaire(),
  allGames: getAllGames(),
});

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    adminActions: bindActionCreators(adminActions, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminPage', reducer });
const withSaga = injectSaga({ key: 'adminPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminPage);
