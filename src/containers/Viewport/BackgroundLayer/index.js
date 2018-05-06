import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';

import {
  generateColorStops,
  largeBasePattern,
  smallBasePattern,
  axisBasePattern,
} from './utils.js';

class BackgroundLayer extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };
  render() {
    const { width, height } = this.props;
    const largeColorStops = generateColorStops(width, 250, largeBasePattern);
    const smallColorStops = generateColorStops(width, 25, smallBasePattern);
    const axisColorStops = generateColorStops(width, width, axisBasePattern);
    return (
      <Group>
        <Rect
          width={width}
          height={height}
          fillLinearGradientStartPointX={0}
          fillLinearGradientEndPointX={width}
          fillLinearGradientColorStops={largeColorStops}
        />
        <Rect
          width={width}
          height={height}
          fillLinearGradientStartPointY={0}
          fillLinearGradientEndPointY={height}
          fillLinearGradientColorStops={largeColorStops}
        />
        <Rect
          width={width}
          height={height}
          fillLinearGradientStartPointX={0}
          fillLinearGradientEndPointX={width}
          fillLinearGradientColorStops={smallColorStops}
        />
        <Rect
          width={width}
          height={height}
          fillLinearGradientStartPointY={0}
          fillLinearGradientEndPointY={height}
          fillLinearGradientColorStops={smallColorStops}
        />
        <Rect
          width={width}
          height={height}
          fillLinearGradientStartPointX={0}
          fillLinearGradientEndPointX={height}
          fillLinearGradientColorStops={axisColorStops}
        />
        <Rect
          width={width}
          height={height}
          fillLinearGradientStartPointY={0}
          fillLinearGradientEndPointY={height}
          fillLinearGradientColorStops={axisColorStops}
        />
      </Group>
    );
  }
}

export default BackgroundLayer;
