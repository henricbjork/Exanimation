import React, { useRef } from 'react';
import * as THREE from 'three';
import Song from '../Song/Song';
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
  let lineWidth;
  const mesh = useRef();

  if (windowSize !== undefined && windowSize.width < 700) {
    SIZE = 4;
    lineWidth = 0.05;
  } else if (windowSize !== undefined && windowSize.width > 700) {
    SIZE = 8;
    lineWidth = 0.1;
  }

  // useFrame(() => {
  //   mesh.current.rotation.y += 0.001;
  // });

  const geo = new THREE.IcosahedronGeometry(SIZE);

  const wireGeo = createTubeWireframe(geo, {
    thickness: lineWidth, // thickness in world units of tubes
    radiusSegments: 4, // number of segments around the tubes
    mode: 'triangle', // face layout, use quads instead of triangles
  });

  const vertices = geo.vertices;

  // console.log(vertices);

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
