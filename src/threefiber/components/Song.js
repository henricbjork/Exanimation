import React, { useRef } from 'react';
import { TextureLoader } from 'three';
import { playSelected } from './../../spotify/functions/playSelected';

const Song = ({ distance, imageUrl, recommendation, setCurrentSong, setRecommendedTracks, accessToken }) => {
  console.log(setCurrentSong)
  const mesh = useRef();

  const loader = new TextureLoader();
  const texture = loader.load(imageUrl);

  return (
    <group ref={mesh} >
      <mesh
        position={[distance.x, distance.y, distance.z]}
        scale={[0.15, 0.15, 0.15]}
        onPointerDown={()=> {
          playSelected(recommendation.uri, accessToken, setRecommendedTracks, setCurrentSong);
        }}
      >
        <boxBufferGeometry attach='geometry' args={[5, 5, 5]} />
        <meshStandardMaterial attach='material' map={texture} />
      </mesh>
    </group>
  );
};

export default Song;
