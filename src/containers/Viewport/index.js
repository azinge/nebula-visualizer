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
      stage: {
        height: 0,
        width: 0,
      },
      viewport: {
        height: 4000,
        width: 4000,
      },
    };
    this.openMenu = this.openMenu.bind(this);
  }
  measureView(event) {
    this.setState({
      stage: {
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      },
    });
  }
  openMenu(e) {
    // TODO: implement menu logic
    e.evt.preventDefault();
  }
  render() {
    const { stage, viewport } = this.state;
    const dragBoundFunc = ({ x, y }) => {
      console.log(x, y);
      return {
        x: Math.min(0, Math.max(x, stage.width + -viewport.width)),
        y: Math.min(0, Math.max(y, stage.height + -viewport.height)),
      };
    };
    return (
      <View style={styles.container}>
        <View onLayout={event => this.measureView(event)}>
          <View style={styles.viewport}>
            <Stage height={stage.height} width={stage.width} onContextMenu={this.openMenu}>
              <Layer x={-1950} y={-2050 + stage.height} draggable dragBoundFunc={dragBoundFunc}>
                <BackgroundLayer viewport={viewport} />
                <LinkLayer />
                <ComponentLayer viewport={viewport} />
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
