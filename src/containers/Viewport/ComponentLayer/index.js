import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

class ComponentLayer extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      initPos: { x: 2000, y: 1900 },
    };
  }
  onDragEnd = evt => {
    // const {x, y} =
    // console.log(evt.);
  };
  dragBoundFunc = ({ x, y }) => {
    // console.log(e);
    const { lastPos } = this.state;
    console.log(x, y);
    return {
      x: Math.round(x / 50) * 50,
      y: Math.round(y / 50) * 50,
    };
  };
  render() {
    const { initPos } = this.state;
    return (
      <Rect
        x={initPos.x}
        y={initPos.y}
        width={100}
        height={100}
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
        shadowBlur={5}
        draggable
        dragBoundFunc={this.dragBoundFunc}
        onDragEnd={this.onDragEnd}
      />
    );
  }
}

export default ComponentLayer;
