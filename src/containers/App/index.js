import React, { Component } from 'react';
import { View } from 'react-native';

import Viewport from '../Viewport';
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
