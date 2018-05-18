import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, TextInput, Button } from 'react-native';

import {
  receiveProgram,
  executeProgram,
  refreshProgram,
  refreshViewport,
} from '../../redux/Program/actions';
import styles from './styles.js';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programText: props.program,
      paramsText: '',
      outputText: '',
    };

    this.refreshViewport = this.refreshViewport.bind(this);
    this.refreshProgram = this.refreshProgram.bind(this);
    this.executeProgram = this.executeProgram.bind(this);
  }

  async refreshViewport() {
    try {
      const { dispatch } = this.props;
      const { programText } = this.state;
      await dispatch(receiveProgram(programText));
      await dispatch(refreshViewport());
    } catch (err) {
      this.setState({ outputText: `${err}` });
    }
  }

  async refreshProgram() {
    try {
      const { dispatch } = this.props;
      const program = await dispatch(refreshProgram());
      this.setState({ programText: program });
    } catch (err) {
      this.setState({ outputText: `${err}` });
    }
  }

  async executeProgram() {
    try {
      const { dispatch } = this.props;
      const { programText, paramsText } = this.state;
      await dispatch(receiveProgram(programText));
      const response = await dispatch(executeProgram(JSON.parse(paramsText || '{}')));
      this.setState({ outputText: `${response}` });
    } catch (err) {
      this.setState({ outputText: `${err}` });
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <TextInput
          style={{ height: window.innerHeight - 335, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={programText => this.setState({ programText })}
          value={this.state.programText}
          placeholder="Your Program goes here"
          multiline
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 35,
            width: '100%',
          }}
        >
          <Button title="Compile =>" onPress={this.refreshViewport} />
          <Button title="<= Compile" onPress={this.refreshProgram} />
          <Button title="Execute" onPress={this.executeProgram} />
        </View>
        <TextInput
          style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={paramsText => this.setState({ paramsText })}
          value={this.state.paramsText}
          placeholder="Your Params go here (in well formed JSON)"
          multiline
        />
        <TextInput
          style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={outputText => this.setState({ outputText })}
          value={this.state.outputText}
          multiline
          editable={false}
        />
      </View>
    );
  }
}

TextArea.propTypes = {
  program: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  program: state.program.data,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
