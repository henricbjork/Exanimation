import React, { useRef, useState } from 'react';
import { TextureLoader } from 'three';
import { playSelectedTrack } from '../../spotify/functions/playSelectedTrack';
import { useSpring, a } from 'react-spring/three';

const Song = ({
  distance,
  imageUrl,
  recommendation,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  currentDevice,
  icoSize,
}) => {
  const loader = new TextureLoader();
  const texture = loader.load(imageUrl);

  const [hover, setHover] = useState(false);
  const mesh = useRef();

  let SIZE;

  if (icoSize === 8) {
    SIZE = 10;
  } else {
    SIZE = 6;
  }

  const props = useSpring({
    scale: hover ? [0.2, 0.2, 0.2] : [0.15, 0.15, 0.15],
  });

  return (
    <group ref={mesh}>
      <a.mesh
        position={[distance.x, distance.y, distance.z]}
        scale={props.scale}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => {
          playSelectedTrack(
            recommendation.uri,
            accessToken,
            setRecommendedTracks,
            setCurrentSong,
            currentDevice.id
          );
        }}
      >
        <boxBufferGeometry attach='geometry' args={[SIZE, SIZE, SIZE]} />
        <meshStandardMaterial attach='material' map={texture} />
      </a.mesh>
    </group>
  );
};

export default Song;
