import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, Line, Rect } from 'react-konva';

import { rawToUnitCoords } from '../utils';
import { updateConstruct } from '../../../../redux/Constructs/actions';

class Link extends Component {
  constructor(props) {
    super(props);

    const adjustment = {
      x: (100 - props.styles.width) / 2,
      y: (100 - props.styles.height) / 2,
    };

    this.state = {
      adjustment,
      from: {
        x: props.from.x + adjustment.x,
        y: props.from.y + adjustment.y,
      },
      to: {
        x: props.to.x + adjustment.x,
        y: props.to.y + adjustment.y,
      },
    };
  }

  onDragEnd = target => evt => {
    const { x, y } = evt.target.attrs;
    evt.cancelBubble = true; // eslint-disable-line no-param-reassign
    this.setState({ [target]: { x, y } });
    this.updateLink();
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

  updateLink = async () => {
    const { id, styles, dispatch } = this.props;
    const { from, to, adjustment } = this.state;

    const refitCoords = ({ x, y }) =>
      rawToUnitCoords({
        x: x - adjustment.x,
        y: y - adjustment.y,
      });

    const link = {
      from: refitCoords(from),
      to: refitCoords(to),
      id,
      styles,
    };

    await dispatch(updateConstruct(link));
  };

  render() {
    const { styles } = this.props;
    const { from: fromPos, to: toPos, adjustment } = this.state;
    return (
      <Group>
        <Line
          points={[
            fromPos.x + adjustment.x,
            fromPos.y + adjustment.y,
            toPos.x + adjustment.x,
            toPos.y + adjustment.y,
          ]}
          strokeWidth={15}
          stroke="black"
        />
        <Rect
          x={fromPos.x}
          y={fromPos.y}
          draggable
          dragBoundFunc={this.dragBoundFunc}
          onDragEnd={this.onDragEnd('from')}
          {...styles}
        />
        <Rect
          x={toPos.x}
          y={toPos.y}
          draggable
          dragBoundFunc={this.dragBoundFunc}
          onDragEnd={this.onDragEnd('to')}
          {...styles}
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
  styles: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
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

export default connect(null, mapDispatchToProps)(Link);
