import React, { useRef } from 'react';
import * as THREE from 'three';
import { useSpring, a } from 'react-spring';
import Song from '../Song/Song';
import createTubeWireframe from 'three-tube-wireframe';
import { useFrame } from 'react-three-fiber';

const Icosahedron = ({
  recommendedTracks,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  currentDevice,
  windowSize,
}) => {
  let SIZE;
  const mesh = useRef();

  if (windowSize !== undefined && windowSize.width < 700) {
    SIZE = 5;
  } else if (windowSize !== undefined && windowSize.width > 700) {
    SIZE = 8;
  }

  // useFrame(() => {
  //   mesh.current.rotation.y += 0.001;
  // });

  const geo = new THREE.IcosahedronGeometry(SIZE);

  const wireGeo = createTubeWireframe(geo, {
    thickness: 0.1, // thickness in world units of tubes
    radiusSegments: 4, // number of segments around the tubes
    mode: 'triangle', // face layout, use quads instead of triangles
  });

  const vertices = geo.vertices;

  console.log(vertices);

  return (
    <>
      <mesh geometry={wireGeo} ref={mesh}>
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
