import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playSelectedTrack } from '../../../spotify/functions/playSelectedTrack';
import { Html } from 'drei';
import './Song.css';
import { checkSongTextWidth } from '../../../spotify/functions/checkSongTextWidth';
import { checkArtistTextWidth } from '../../../spotify/functions/checkArtistTextWidth';

const Song = ({
  distance,
  imageUrl,
  recommendation,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  currentDevice,
  icoSize,
  isActive,
  setActiveId
}) => {
  const [hover, setHover] = useState(false);

  useEffect(()=>{
    if(hover || isActive) {
      checkSongTextWidth('recommendation');
      checkArtistTextWidth('recommendation');
    }
  }, [hover, isActive])

  const loader = new THREE.TextureLoader();
  const texture = loader.load(imageUrl);
  const mobile = icoSize === 4;
  const desktop = icoSize === 8;

  const song = {
    title: recommendation.name,
    artist: recommendation.artists[0].name,
    images: recommendation.album.images,
  };

  const mesh = useRef();

  let SIZE;

  if (desktop) {
    SIZE = 2.5;
  } else {
    SIZE = 1.2;
  }

  return (
    <>
      <group ref={mesh}>
        {desktop ? (
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
        ) : (
          <mesh
            position={[distance.x, distance.y, distance.z]}
            onPointerDown={(e) => {
              if (isActive) {
                e.stopPropagation();
                playSelectedTrack(
                  recommendation.uri,
                  accessToken,
                  setRecommendedTracks,
                  setCurrentSong,
                  currentDevice.id
                );
              } else {
                setActiveId(recommendation.id);
              }
            }}
          >
            <boxBufferGeometry attach='geometry' args={[SIZE, SIZE, SIZE]} />
            <meshStandardMaterial attach='material' map={texture} />
          </mesh>
        )}

        {((desktop && hover) || (mobile && isActive)) && (
          <Html position={[distance.x - 3, distance.y - 1.5, distance.z]}>
            <div className='song-frame'>
              <img src={song.images[2].url} alt='song' />
              <div>
                <div className='recommendation-text-song'>
                  <p>{song.title}</p>
                </div>
                <div className='recommendation-text-artist'>
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
