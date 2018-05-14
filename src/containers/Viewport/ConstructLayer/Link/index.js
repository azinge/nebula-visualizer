import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Line, Rect } from 'react-konva';

import styles from '../styles.js';

class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: {
        x: props.from.x + 25,
        y: props.from.y + 25,
      },
      to: {
        x: props.to.x + 25,
        y: props.to.y + 25,
      },
    };
  }

  onDragEnd = target => evt => {
    const { x, y } = evt.target.attrs;
    evt.cancelBubble = true; // eslint-disable-line no-param-reassign
    this.setState({ [target]: { x, y } });
  };

  dragBoundFunc = ({ x, y }) => {
    const { offset } = this.props;
    const adjustment = {
      x: offset.x % 50,
      y: offset.y % 50,
    };
    const snapped = {
      x: Math.round((x - adjustment.x - 25) / 50) * 50,
      y: Math.round((y - adjustment.y - 25) / 50) * 50,
    };
    const coords = {
      x: adjustment.x + snapped.x + 25,
      y: adjustment.y + snapped.y + 25,
    };
    return coords;
  };

  render() {
    const { from: fromPos, to: toPos } = this.state;
    return (
      <Group>
        <Line
          points={[fromPos.x + 25, fromPos.y + 25, toPos.x + 25, toPos.y + 25]}
          strokeWidth={15}
          stroke="black"
        />
        <Rect
          x={fromPos.x}
          y={fromPos.y}
          draggable
          dragBoundFunc={this.dragBoundFunc}
          onDragEnd={this.onDragEnd('from')}
          {...styles.linkNode}
        />
        <Rect
          x={toPos.x}
          y={toPos.y}
          draggable
          dragBoundFunc={this.dragBoundFunc}
          onDragEnd={this.onDragEnd('to')}
          {...styles.linkNode}
        />
      </Group>
    );
  }
}

Link.propTypes = {
  from: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  to: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  offset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Link;
