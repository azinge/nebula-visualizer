import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';

import Construct from './Construct';
import LinkConstruct from './Link';
import {
  runProgram,
  createConstructs,
  parseLink,
  parseConstruct,
  unitToRawCoords,
} from './utils.js';

class ConstructLayer extends Component {
  constructor(props) {
    super(props);
    console.log(runProgram());
    const { constructs: rawConstructs, links: rawLinks } = createConstructs();
    console.log(rawConstructs);

    const constructs = rawConstructs.map(parseConstruct);
    const links = rawLinks.map(parseLink);

    console.log(constructs);
    this.state = {
      constructs,
      links,
    };
  }

  renderLinks(links) {
    return links.map(link => (
      <LinkConstruct from={link.from} to={link.to} offset={this.props.offset} key={link.key} />
    ));
  }

  renderConstructs(constructs, parentLoc = null) {
    return constructs.map(con => {
      let pos = unitToRawCoords(con.pos);
      if (parentLoc) {
        const adjustment = { x: (100 - con.styles.width) / 2, y: (100 - con.styles.height) / 2 };
        const scaledConPos = { x: con.pos.x * 50, y: con.pos.y * -50 };
        const scaledParentLoc = { x: parentLoc.x * 50, y: parentLoc.y * -50 };
        pos = {
          x: scaledConPos.x - scaledParentLoc.x - adjustment.x,
          y: scaledConPos.y - scaledParentLoc.y - adjustment.y,
        };
      }
      return (
        <Construct
          initPos={pos}
          styles={con.styles}
          name={con.name}
          info={con.info}
          offset={this.props.offset}
          key={con.key}
        >
          {this.renderConstructs(con.children, con.pos)}
        </Construct>
      );
    });
  }

  render() {
    const { links, constructs } = this.state;
    return (
      <Group>
        {this.renderLinks(links)}
        {this.renderConstructs(constructs)}
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
