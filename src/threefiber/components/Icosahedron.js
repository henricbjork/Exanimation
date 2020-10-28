import React from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring';
import Song from './Song';
import createTubeWireframe from 'three-tube-wireframe';

const Icosahedron = ({
  recommendedTracks,
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

  const geo = new THREE.IcosahedronGeometry();

  const wireGeo = createTubeWireframe(geo, {
    thickness: 0.01, // thickness in world units of tubes
    radiusSegments: 4, // number of segments around the tubes
    mode: 'triangle', // face layout, use quads instead of triangles
  });

  const vertices = new THREE.IcosahedronGeometry(SIZE).vertices;

  return (
    <>
      <mesh scale={[SIZE, SIZE, SIZE]} geometry={wireGeo}>
        <meshPhysicalMaterial attach='material' roughness='0.75' flatShading />
      </mesh>
      {recommendedTracks &&
        recommendedTracks.map((recommendation, i) => {
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
