import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';

import Construct from './Construct';
import LinkConstruct from './Link';

class ConstructLayer extends Component {
  static propTypes = {
    constructs: PropTypes.arrayOf(
      PropTypes.shape({
        pos: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }).isRequired,
        key: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }).isRequired,
        to: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }).isRequired,
        key: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    offset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
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
    return (
      <Group>
        {this.props.links.map(link => (
          <LinkConstruct from={link.from} to={link.to} offset={this.props.offset} key={link.key} />
        ))}
        {this.props.constructs.map(con => (
          <Construct initPos={con.pos} offset={this.props.offset} key={con.key} />
        ))}
      </Group>
    );
  }
}

export default ConstructLayer;
