import React from 'react';
import * as THREE from 'three';
import Song from './Song';

const SIZE = 8;

const Icosahedron = ({
  recommendations,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  onPointerOver,
  onPointerOut,
}) => {
  const vertices = new THREE.IcosahedronGeometry(SIZE).vertices;

  return (
    <>
      <mesh
        scale={[SIZE, SIZE, SIZE]}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <icosahedronBufferGeometry attach='geometry'  />
        <meshBasicMaterial attach='material' wireframe />
      </mesh>
      {recommendations &&
        recommendations.map((recommendation, i) => {
          return (
            <Song
              key={i}
              distance={vertices[i]}
              imageUrl={recommendation.album.images[0].url}
              setCurrentSong={setCurrentSong}
              setRecommendedTracks={setRecommendedTracks}
              accessToken={accessToken}
              recommendation={recommendation}
            />
          );
        })}
    </>
  );
};

export default Icosahedron;
