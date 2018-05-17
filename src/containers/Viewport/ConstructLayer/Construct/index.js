import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';

import { rawToUnitCoords } from '../utils';
import { updateConstruct } from '../../../../redux/Constructs/actions';

class Construct extends Component {
  constructor(props) {
    super(props);
    const adjustment = {
      x: (100 - props.styles.width) / 2,
      y: (100 - props.styles.height) / 2,
    };
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
    this.updateConstruct();
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

  updateConstruct = async () => {
    const {
      childConstructs, info, id, name, styles, dispatch,
    } = this.props;
    const { currPos, adjustment } = this.state;

    const refitCoords = ({ x, y }) =>
      rawToUnitCoords({
        x: x - adjustment.x,
        y: y - adjustment.y,
      });

    const link = {
      pos: refitCoords(currPos),
      key: id,
      info,
      children: childConstructs,
      name,
      styles,
    };

    await dispatch(updateConstruct(link));
  };

  render() {
    const {
      info, children, styles, name,
    } = this.props;
    const { currPos } = this.state;
    const text = Object.keys(info)
      .map(key => `${key}: ${info[key]}`)
      .join('\n');
    return (
      <Group
        x={currPos.x}
        y={currPos.y}
        onDragEnd={this.onDragEnd}
        dragBoundFunc={this.dragBoundFunc}
        draggable
      >
        {children}
        <Rect {...styles} />
        <Text text={name} />
        <Text x={2} y={15} text={text} />
      </Group>
    );
  }
}

Construct.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  info: PropTypes.shape({}).isRequired,
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
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(Construct);
