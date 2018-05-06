import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import KonvaTest from '../KonvaTest';
import logo from '../../assets/react-logo.png';
import styles from './styles.js';

class App extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Welcome to React</Text>
        </View>
        <KonvaTest />
      </View>
    );
  }
}

export default App;
