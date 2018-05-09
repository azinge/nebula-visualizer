import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Line } from 'react-konva';

import grid from '../../../assets/grid.svg';

class BackgroundLayer extends Component {
  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    const image = new window.Image();
    image.onload = () => {
      this.setState({ fillPatternImage: image });
    };
    image.src = grid;
    this.state = {
      fillPatternImage: null,
    };
  }
  render() {
    const { width, height } = this.props.viewport;

    const blockSize = 50 / 640;

    const largeBlockScale = blockSize * 5;
    const smallBlockScale = blockSize;

    return (
      <Group>
        <Rect
          width={width}
          height={height}
          fillPatternImage={this.state.fillPatternImage}
          fillPatternScale={{ x: largeBlockScale, y: largeBlockScale }}
        />
        <Rect
          width={width}
          height={height}
          fillPatternImage={this.state.fillPatternImage}
          fillPatternScale={{ x: smallBlockScale, y: smallBlockScale }}
        />
        <Line points={[width / 2, 0, width / 2, height]} strokeWidth={15} stroke="black" />
        <Line points={[0, height / 2, width, height / 2]} strokeWidth={15} stroke="black" />
      </Group>
    );
  }
}

export default BackgroundLayer;
