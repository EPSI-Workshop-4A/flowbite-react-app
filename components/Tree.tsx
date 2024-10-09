"use client"

import FamilyTree from '@balkangraph/familytree.js';
import React, { Component } from 'react';


export default class UserTree extends Component {
  divRef: React.RefObject<unknown>;
  family: FamilyTree;

  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.family = new FamilyTree(this.divRef.current, {
      nodes: this.props.nodes,
      nodeTreeMenu: true,
      nodeMenu: {
        details: { text: "Details" },
        edit: { text: "Edit" },
        remove: { text: "Remove" },
      },
      nodeBinding: {
        field_0: 'name',
        date_0: 'birthdate',
        img_0: 'img'
      }
    });

    this.family.on('updated', (sender: any, args) => {
      console.log('updated', args);

    });
  }

  render() {
    return (
      <div id="tree" ref={this.divRef}></div>
    );
  }
}
