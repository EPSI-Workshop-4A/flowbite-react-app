"use client";

import FamilyTree from '@balkangraph/familytree.js';
import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  name: string;
  birthdate?: string; // Optional if not provided for all nodes
  img?: string; // Optional if not provided for all nodes
  gender?: string; // Include any other properties that your nodes may have
  pids?: number[]; // Parent IDs for the node
}

const UserTree: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [tree, setTree] = useState(null);

  function removeCircularReferences(nodes: any[]) {
    console.log('remove', nodes);

    /* return nodes.map(node => {
      const { parent, children, ...rest } = node; // Remove potential circular refs (like children)
      return rest; // Return only the properties needed for saving the tree
    }); */

    return nodes.map(item => ({
      id: item.id,
      name: item.name,
      birthdate: item.birthdate || undefined,
      img: item.img || undefined,
      gender: item.gender || undefined,
      pids: item.pids || undefined
    }));
  }

  useEffect(() => {
    // Fetch the nodes from the API when the component mounts
    const fetchNodes = async () => {
      try {
        const response = await fetch('/api/my-tree');
        if (!response.ok) {
          throw new Error('Failed to fetch nodes');
        }
        const data = await response.json();
        setTree(data); // Update state with the fetched data

        // Initialize the FamilyTree after nodes are set
        if (divRef.current) {
          const familyTree = new FamilyTree(divRef.current, {
            nodes: data.tree,
            nodeTreeMenu: true,
            nodeMenu: {
              details: { text: 'Details' },
              edit: { text: 'Edit' },
              remove: { text: 'Remove' },
            },
            nodeBinding: {
              field_0: 'name',
              date_0: 'birthdate',
              img_0: 'img',
            },
          });

          // Add event listener for the update event
          familyTree.on('updated', async (sender, args) => {
            const nodes = Object.values(familyTree.nodes);
            console.log('update0', nodes);
            const updatedTree = removeCircularReferences(nodes);
            // const updatedTree = nodes;
            console.log('updated', updatedTree);

            console.log('request1', JSON.stringify({
              id: data?.id,
              tree: updatedTree
            }));
            try {
              // Make a PUT request to update the tree
              console.log('request', JSON.stringify({
                id: data?.id,
                tree: updatedTree
              }));
              const response = await fetch('/api/my-tree', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: data?.id,
                  tree: updatedTree
                }), // Send the updated node data
              });

              if (!response.ok) {
                throw new Error('Failed to update tree');
              }

              const updatedData = await response.json();
              setTree(updatedData); // Update state with the newly updated nodes
              console.log('Tree updated successfully:', updatedData);
            } catch (error) {
              console.error('Error updating tree:', error);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching nodes:', error);
      }
    };

    fetchNodes();
  }, []); // Empty dependency array ensures this only runs once after the component mounts

  return <div id="tree" ref={divRef}></div>;
};

export default UserTree;
