import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

class KonvaTest extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer draggable>
          <Text text="Try click on rect" />
          <Rect
            x={20}
            y={20}
            width={50}
            height={50}
            fill="red"
            ref={node => {
              this.rect = node;
            }}
            shadowBlur={5}
            onDragEnd={this.changeSize}
            onDragStart={this.changeSize}
            draggable
          />
        </Layer>
      </Stage>
    );
  }
}

export default KonvaTest;
