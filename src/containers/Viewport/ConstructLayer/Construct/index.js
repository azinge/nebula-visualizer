import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';

class Construct extends Component {
  constructor(props) {
    super(props);

    const adjustment = { x: (100 - props.styles.width) / 2, y: (100 - props.styles.height) / 2 };
    this.state = {
      adjustment,
      currPos: {
        x: props.initPos.x + adjustment.x,
        y: props.initPos.y + adjustment.y,
      },
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
      x: Math.round((x - adjustment.x - this.state.adjustment.x) / 50) * 50,
      y: Math.round((y - adjustment.y - this.state.adjustment.y) / 50) * 50,
    };
    const coords = {
      x: adjustment.x + snapped.x + this.state.adjustment.x,
      y: adjustment.y + snapped.y + this.state.adjustment.y,
    };
    return coords;
  };

  render() {
    const { currPos } = this.state;
    return (
      <Group
        x={currPos.x}
        y={currPos.y}
        onDragEnd={this.onDragEnd}
        dragBoundFunc={this.dragBoundFunc}
        draggable
      >
        {this.props.children}
        <Rect {...this.props.styles} />
        <Text text={this.props.name} />
      </Group>
    );
  }
}

Construct.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  initPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  offset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Construct;
