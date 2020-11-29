import React, { Fragment, useRef } from 'react';
import * as THREE from 'three';
import SongDesktop from '../SongDesktop';
import SongMobile from '../SongMobile';
import createTubeWireframe from 'three-tube-wireframe';

const Icosahedron = ({
  recommendedTracks,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  currentDevice,
  windowSize,
}) => {
  const [activeId, setActiveId] = React.useState("");

  let SIZE;
  let lineWidth;
  let desktop = false;
  let mobile = false;
  const mesh = useRef();

  if (windowSize !== undefined && windowSize.width <= 700) {
    mobile = true;
    SIZE = 4;
    lineWidth = 0.05;
  } else if (windowSize !== undefined && windowSize.width > 700) {
    desktop = true;
    SIZE = 8;
    lineWidth = 0.1;
  }

  const geo = new THREE.IcosahedronGeometry(SIZE);

  const wireGeo = createTubeWireframe(geo, {
    thickness: lineWidth, // thickness in world units of tubes
    radiusSegments: 4, // number of segments around the tubes
    mode: 'triangle', // face layout, use quads instead of triangles
  });

  const vertices = geo.vertices;

  return (
    <>
      <mesh geometry={wireGeo} ref={mesh}>
        <meshPhysicalMaterial attach='material' roughness='0.75' flatShading />
      </mesh>

      {desktop && recommendedTracks &&
        recommendedTracks.map((recommendation, i) => {
          return (
            <Fragment key={i}>
              <SongDesktop
                distance={vertices[i]}
                imageUrl={recommendation.album.images[0].url}
                setCurrentSong={setCurrentSong}
                setRecommendedTracks={setRecommendedTracks}
                accessToken={accessToken}
                currentDevice={currentDevice}
                recommendation={recommendation}
              />
            </Fragment>
          );
        })}

        {mobile && recommendedTracks &&
        recommendedTracks.map((recommendation, j) => {
          return (
            <Fragment key={j}>
              <SongMobile
                distance={vertices[j]}
                imageUrl={recommendation.album.images[0].url}
                setCurrentSong={setCurrentSong}
                setRecommendedTracks={setRecommendedTracks}
                accessToken={accessToken}
                currentDevice={currentDevice}
                recommendation={recommendation}
                setActiveId={setActiveId}
                isActive={(activeId===recommendation.id) ? true : false}
              />
            </Fragment>
          );
        })}
    </>
  );
};

export default Icosahedron;
