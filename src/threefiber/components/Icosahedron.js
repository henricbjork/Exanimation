import React from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring';
import Song from './Song';

const Icosahedron = ({
  recommendations,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  currentDevice,
  windowSize,
}) => {
  let SIZE;

  if (windowSize !== undefined && windowSize.width < 700) {
    SIZE = 5;
  } else if (windowSize !== undefined && windowSize.width > 700) {
    SIZE = 8;
  }

  const vertices = new THREE.IcosahedronGeometry(SIZE, 1).vertices;

  return (
    <>
      <mesh scale={[SIZE, SIZE, SIZE]}>
        <icosahedronBufferGeometry attach='geometry' args={[1, 1]} />
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
              currentDevice={currentDevice}
              recommendation={recommendation}
              icoSize={SIZE}
            />
          );
        })}
    </>
  );
};

export default Icosahedron;
