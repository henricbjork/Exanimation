import React, { useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Song = ({ distance, imageUrl }) => {
  const mesh = useRef();

  const loader = new TextureLoader();

  const texture = loader.load(imageUrl);

  return (
    <group ref={mesh}>
      <mesh
        position={[distance.x, distance.y, distance.z]}
        scale={[0.15, 0.15, 0.15]}

      >
        <boxBufferGeometry attach='geometry' args={[5, 5, 5]} />
        <meshStandardMaterial attach='material' map={texture} />
      </mesh>
    </group>
  );
};

export default Song;
