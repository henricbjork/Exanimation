import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Html } from 'drei';
import { setSongSelection } from '../../../spotify/functions/setSongSelection';
import { playSelectedTrack } from '../../../spotify/functions/playSelectedTrack';
import { checkSongTextWidth } from '../../../spotify/functions/checkSongTextWidth';
import { checkArtistTextWidth } from '../../../spotify/functions/checkArtistTextWidth';
import './SongDesktop.css';

const SongDesktop = ({
  distance,
  imageUrl,
  recommendation,
  setCurrentSong,
  setRecommendedTracks,
  accessToken,
  currentDevice
}) => {
  const [hover, setHover] = useState(false);

  useEffect(()=>{
    if(hover) {
      checkSongTextWidth('recommendation');
      checkArtistTextWidth('recommendation');
    }
  }, [hover])

  const loader = new THREE.TextureLoader();
  const texture = loader.load(imageUrl);

  const song = {
    title: recommendation.name,
    artist: recommendation.artists[0].name,
    images: recommendation.album.images,
  };

  const mesh = useRef();

  let SIZE = 2.5;

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
          }}
        >
          <boxBufferGeometry attach='geometry' args={[SIZE, SIZE, SIZE]} />
          <meshStandardMaterial attach='material' map={texture} />
        </mesh>

        {hover && (
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

export default SongDesktop;
