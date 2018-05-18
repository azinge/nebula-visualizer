import React, { Component } from 'react';
import { View } from 'react-native';

import Viewport from '../Viewport';
import TextArea from '../TextArea';
import styles from './styles.js';

class Root extends Component {
  render() {
    return (
      <View style={[styles.main, { flex: 1, flexDirection: 'row' }]}>
        <TextArea />
        <Viewport />
      </View>
    );
  }
}

export default Root;
