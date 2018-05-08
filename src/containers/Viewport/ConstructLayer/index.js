import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

class ConstructLayer extends Component {
  static propTypes = {
    offset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPos: { x: 2000, y: 1900 },
    };
  }

  onDragEnd = evt => {
    const { x, y } = evt.target.attrs;
    evt.cancelBubble = true; // eslint-disable-line no-param-reassign
    this.setState({ currentPos: { x, y } });
  };

  dragBoundFunc = ({ x, y }) => {
    const { offset } = this.props;
    const adjustment = {
      x: offset.x % 50,
      y: offset.y % 50,
    };
    const snapped = {
      x: Math.round((x - adjustment.x) / 50) * 50,
      y: Math.round((y - adjustment.y) / 50) * 50,
    };
    const coords = {
      x: adjustment.x + snapped.x,
      y: adjustment.y + snapped.y,
    };
    return coords;
  };

  render() {
    const { currentPos } = this.state;
    return (
      <Rect
        x={currentPos.x}
        y={currentPos.y}
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

export default ConstructLayer;
