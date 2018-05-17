import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';

import Construct from './Construct';
import LinkConstruct from './Link';
import { unitToRawCoords } from './utils.js';

class ConstructLayer extends Component {
  renderLinks(links) {
    return links.map(link => {
      const fromPos = unitToRawCoords(link.from);
      const toPos = unitToRawCoords(link.to);
      return (
        <LinkConstruct
          from={fromPos}
          to={toPos}
          styles={link.styles}
          offset={this.props.offset}
          key={link.key}
          id={link.key}
        />
      );
    });
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
          childConstructs={con.children}
          key={con.key}
          id={con.key}
        >
          {this.renderConstructs(con.children, con.pos)}
        </Construct>
      );
    });
  }

  render() {
    const { links, constructs } = this.props;
    return (
      <Group>
        {this.renderLinks(links)}
        {this.renderConstructs(constructs)}
      </Group>
    );
  }
}

ConstructLayer.propTypes = {
  constructs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  offset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  constructs: state.constructs.data,
  links: state.links.data,
});

export default connect(mapStateToProps, null)(ConstructLayer);
