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
      offset: {
        x: -1950,
        y: -2050,
      },
    };
    this.openMenu = this.openMenu.bind(this);
  }
  onDragEnd = evt => {
    const { x, y } = evt.target.attrs;
    evt.cancelBubble = true; // eslint-disable-line no-param-reassign
    this.setState({ offset: { x, y } });
  };
  measureView(event) {
    const { stage: { height: prevHeight }, offset: { x, y } } = this.state;
    const { width, height } = event.nativeEvent.layout;
    const heightDiff = height - prevHeight;
    this.setState({
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
    const dragBoundFunc = ({ x, y }) => ({
      x: Math.min(0, Math.max(x, stage.width + -viewport.width)),
      y: Math.min(0, Math.max(y, stage.height + -viewport.height)),
    });
    return (
      <View style={styles.container}>
        <View onLayout={event => this.measureView(event)}>
          <View style={styles.viewport}>
            <Stage height={stage.height} width={stage.width} onContextMenu={this.openMenu}>
              <Layer
                x={offset.x}
                y={offset.y}
                draggable
                dragBoundFunc={dragBoundFunc}
                onDragEnd={this.onDragEnd}
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
