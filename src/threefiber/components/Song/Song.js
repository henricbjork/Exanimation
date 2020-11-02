import React, { useRef, useState } from 'react';
import * as THREE from 'three';

import { playSelectedTrack } from '../../../spotify/functions/playSelectedTrack';
// import { useSpring, a } from 'react-spring/three';
// import JSONfont from './AktivGrotesk-Regular.json';

// import { useFrame } from 'react-three-fiber';

import { Html } from 'drei';
import './Song.css';

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
  const loader = new THREE.TextureLoader();
  const texture = loader.load(imageUrl);

  const song = {
    title: recommendation.name.slice(0, 15),
    artist: recommendation.artists[0].name.slice(0, 15),
    images: recommendation.album.images,
  };

  const [hover, setHover] = useState(false);
  const mesh = useRef();

  let SIZE;

  if (icoSize === 8) {
    SIZE = 2.5;
  } else {
    SIZE = 1.2;
  }

  // useFrame(() => {
  //   mesh.current.rotation.y += 0.001;
  // });

  // const props = useSpring({
  //   scale: hover ? [0.2, 0.2, 0.2] : [0.15, 0.15, 0.15],
  // });

  // load in font
  // const font = new THREE.FontLoader().parse(JSONfont);

  // configure font mesh
  // const textOptions = {
  //   font,
  //   size: 0.2,
  //   height: 0,
  // };

  return (
    <>
      <group ref={mesh}>
        <mesh
          position={[distance.x, distance.y, distance.z]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
          }}
          onPointerOut={() => setHover(false)}
          onPointerDown={(e) => {
            e.stopPropagation();
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
        </mesh>
        {/* <mesh position={[distance.x - 1.5, distance.y - 1.5, distance.z * 1.2]}>
          <textGeometry
            attach='geometry'
            args={[`${song.title}${song.artist}`, textOptions]}
          />
          <meshStandardMaterial attach='material' />
        </mesh> */}
        {/* <mesh position={[distance.x - 1.5, distance.y - 2, distance.z * 1.2]}>
          <textGeometry
            attach='geometry'
            args={[`${song.artist}`, textOptions]}
          />
          <meshStandardMaterial attach='material' />
        </mesh> */}
        {hover && (
          <Html position={[distance.x - 2, distance.y - 2, distance.z * 1.2]}>
            <div className='song-card'>
              <div className='song-frame'>
                <img src={song.images[2].url} />
                <div>
                  <p>{song.title}</p>
                  <p>{song.artist}</p>
                </div>
              </div>
            </div>
          </Html>
        )}
      </group>
    </>
  );
};

export default Song;
