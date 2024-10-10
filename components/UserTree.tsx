"use client";

import FamilyTree from '@balkangraph/familytree.js';
import React, { Component } from 'react';

interface UserTreeProps {
  nodes: any[];
  onFamilyUpdate: (sender: FamilyTree, args?: any, args1?: any, args2?: any) => boolean | void;
}

export default class UserTree extends Component<UserTreeProps> {
  divRef: React.RefObject<HTMLDivElement>;

  constructor(props: UserTreeProps) {
    super(props);
    this.divRef = React.createRef();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const family = new FamilyTree(this.divRef.current, {
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
        img_0: 'img',
      },
    });

    // Appeler la fonction pour rendre `family` disponible au parent
    // this.props.onFamilyInit(family);
    family.on('update', this.props.onFamilyUpdate)
  }

  render() {
    return <div id="tree" ref={this.divRef}></div>;
  }
}
