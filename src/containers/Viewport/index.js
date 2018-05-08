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
      windowDimensions: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
      stage: {
        height: 0,
        width: 0,
      },
      viewport: {
        height: 4000,
        width: 4000,
      },
      offset: {
        x: -1925,
        y: -2075,
      },
    };
    this.openMenu = this.openMenu.bind(this);
  }
  handleDragEnd = evt => {
    const { x, y } = evt.target.attrs;
    this.setState({ offset: { x, y } });
  };
  handleDragMove = e => {
    console.log(e);
  };
  dragBoundFunc = ({ x, y }) => {
    const { stage, viewport } = this.state;
    return {
      x: Math.min(0, Math.max(x, stage.width + -viewport.width)),
      y: Math.min(0, Math.max(y, stage.height + -viewport.height)),
    };
  };
  measureView(event) {
    const { stage: { height: prevHeight }, offset: { x, y } } = this.state;
    const { width, height } = event.nativeEvent.layout;
    const heightDiff = height - prevHeight;
    this.setState({
      windowDimensions: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
      stage: {
        width,
        height,
      },
      offset: {
        x,
        y: y + heightDiff,
      },
    });
  }
  openMenu(e) {
    // TODO: implement menu logic
    e.evt.preventDefault();
  }
  render() {
    const { stage, viewport, offset } = this.state;

    return (
      <View style={styles.container}>
        <View onLayout={event => this.measureView(event)}>
          <View style={[styles.viewport, { ...this.state.windowDimensions }]}>
            <Stage height={stage.height} width={stage.width} onContextMenu={this.openMenu}>
              <Layer
                x={offset.x}
                y={offset.y}
                draggable
                dragBoundFunc={this.dragBoundFunc}
                onDragMove={this.handleDragMove}
                onDragEnd={this.handleDragEnd}
              >
                <BackgroundLayer viewport={viewport} />
                <LinkLayer />
                <ComponentLayer viewport={viewport} offset={offset} />
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
