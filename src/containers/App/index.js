import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import Viewport from '../Viewport';
import logo from '../../assets/react-logo.png';
import styles from './styles.js';

class App extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Viewport />
      </View>
    );
  }
}

export default App;
