import React, { Component } from 'react';
import { View } from 'react-native';
import { Stage, Layer, Text } from 'react-konva';

import BackgroundLayer from './BackgroundLayer';
import LinkLayer from './LinkLayer';
import ComponentLayer from './ComponentLayer';
import MenuLayer from './MenuLayer';
import styles from './styles.js';

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
    this.openMenu = this.openMenu.bind(this);
  }
  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }
  openMenu(e) {
    // TODO: implement menu logic
    e.evt.preventDefault();
  }
  render() {
    return (
      <View style={styles.container}>
        <View onLayout={event => this.measureView(event)}>
          <View style={styles.viewport}>
            <Stage
              height={this.state.height}
              width={this.state.width}
              onContextMenu={this.openMenu}
            >
              <Layer draggable>
                <BackgroundLayer width={1000} height={1000} />
                <LinkLayer />
                <ComponentLayer />
                <MenuLayer />
                <Text text="Layer Handle" />
              </Layer>
            </Stage>
          </View>
        </View>
      </View>
    );
  }
}

export default Viewport;
