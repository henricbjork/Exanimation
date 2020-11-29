import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setSongSelection } from '../../../spotify/functions/setSongSelection';
import { playSelectedTrack } from '../../../spotify/functions/playSelectedTrack';
import { Html } from 'drei';
import { checkSongTextWidth } from '../../../spotify/functions/checkSongTextWidth';
import { checkArtistTextWidth } from '../../../spotify/functions/checkArtistTextWidth';
import './SongMobile.css';

const SongMobile = ({
  distance,
  imageUrl,
  recommendation,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  currentDevice,
  isActive,
  setActiveId
}) => {

  useEffect(()=>{
    if(isActive) {
      checkSongTextWidth('recommendation');
      checkArtistTextWidth('recommendation');
    }
  }, [isActive])

  const loader = new THREE.TextureLoader();
  const texture = loader.load(imageUrl);

  const song = {
    title: recommendation.name,
    artist: recommendation.artists[0].name,
    images: recommendation.album.images,
  };

  const mesh = useRef();

  let SIZE = 1.2;

  return (
    <>
      <mesh
        ref={mesh}
        position={[distance.x, distance.y, distance.z]}
        onPointerDown={() => {
          if (isActive) {
            // e.stopPropagation();
            setSongSelection(recommendation.uri, accessToken).then(()=> {
              playSelectedTrack(
                recommendation.uri,
                accessToken,
                setRecommendedTracks,
                setCurrentSong,
                currentDevice.id
              );
            });
          } else {
            setActiveId(recommendation.id);
          }
        }}
      >
        <boxBufferGeometry attach='geometry' args={[SIZE, SIZE, SIZE]} />
        <meshStandardMaterial attach='material' map={texture} />
      </mesh>

      {isActive && (
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
    </>
  );
};

export default SongMobile;
