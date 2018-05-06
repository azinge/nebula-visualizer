import React, { Component } from 'react';
import { View } from 'react-native';
import { Stage, Layer, Rect } from 'react-konva';

import styles from './styles.js';

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
  }
  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View onLayout={event => this.measureView(event)}>
          <View style={styles.viewport}>
            <Stage height={this.state.height} width={this.state.width} draggable>
              <Layer>
                <Rect width={50} height={50} fill="red" shadowBlur={5} draggable />
              </Layer>
            </Stage>
          </View>
        </View>
      </View>
    );
  }
}

export default Viewport;
