import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';

import Construct from './Construct';
import LinkConstruct from './Link';
import { runProgram, createConstructs } from './utils.js';

class ConstructLayer extends Component {
  constructor(props) {
    super(props);
    console.log(runProgram());
    console.log(createConstructs());
    const con1 = { pos: { x: 2150, y: 1550 }, key: 1 };
    const con2 = { pos: { x: 2350, y: 1500 }, key: 2 };
    const constructs = [con1, con2];

    const link1 = { from: { x: 2150, y: 1700 }, to: { x: 2350, y: 1750 }, key: 1 };
    const links = [link1];
    this.state = {
      constructs,
      links,
    };
  }

  renderLinks() {
    return this.state.links.map(link => (
      <LinkConstruct from={link.from} to={link.to} offset={this.props.offset} key={link.key} />
    ));
  }

  renderConstructs() {
    return this.state.constructs.map(con => (
      <Construct initPos={con.pos} offset={this.props.offset} key={con.key} />
    ));
  }

  render() {
    return (
      <Group>
        {this.renderLinks()}
        {this.renderConstructs()}
      </Group>
    );
  }
}

ConstructLayer.propTypes = {
  offset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default ConstructLayer;
