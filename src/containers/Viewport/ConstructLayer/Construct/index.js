import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

import styles from '../styles.js';

class ConstructLayer extends Component {
  static propTypes = {
    initPos: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    offset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currPos: props.initPos,
    };
  }

  onDragEnd = evt => {
    const { x, y } = evt.target.attrs;
    evt.cancelBubble = true; // eslint-disable-line no-param-reassign
    this.setState({ currPos: { x, y } });
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
    const { currPos } = this.state;
    return (
      <Rect
        x={currPos.x}
        y={currPos.y}
        draggable
        dragBoundFunc={this.dragBoundFunc}
        onDragEnd={this.onDragEnd}
        {...styles.construct}
      />
    );
  }
}

export default ConstructLayer;
