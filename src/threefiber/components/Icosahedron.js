import React from 'react';
import * as THREE from 'three';
import Song from './Song';
import { playSelected } from '../../App';

const Icosahedron = ({ recommendations }) => {
  const vertices = new THREE.IcosahedronGeometry(4).vertices;

  return (
    <>
      <mesh scale={[2, 2, 2]}>
        <icosahedronBufferGeometry attach='geometry' />
        <meshBasicMaterial attach='material' wireframe />
      </mesh>
      {recommendations &&
        recommendations.map((rec, i) => {
          console.log(rec);
          return (
            <Song
              distance={vertices[i]}
              key={i}
              imageUrl={recommendations[i].album.images[0].url}
              onClick={() => playSelected(recommendations[i].uri)}
            />
          );
        })}
    </>
  );
};

export default Icosahedron;
