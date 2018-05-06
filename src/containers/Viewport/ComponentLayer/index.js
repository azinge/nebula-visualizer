import React, { Component } from 'react';
import { Rect } from 'react-konva';

class ComponentLayer extends Component {
  render() {
    return (
      <Rect
        width={50}
        height={50}
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
        shadowBlur={5}
        draggable
      />
    );
  }
}

export default ComponentLayer;
