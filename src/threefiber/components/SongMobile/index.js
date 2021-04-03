import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { setSongSelection } from '../../../spotify/functions/setSongSelection';
import { playSelectedTrack } from '../../../spotify/functions/playSelectedTrack';
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
  mobileBrowseSong,
  setMobileBrowseSong
}) => {
  const song = {
    id: recommendation.id,
    title: recommendation.name,
    artist: recommendation.artists[0].name,
    images: recommendation.album.images
  };

  const previewSong = (value = null) => {
    setMobileBrowseSong(value);
  };

  useEffect(() => {
    if (mobileBrowseSong?.id === recommendation.id) {
      checkSongTextWidth('recommendation');
      checkArtistTextWidth('recommendation');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileBrowseSong]);

  const loader = new THREE.TextureLoader();
  const texture = loader.load(imageUrl);

  const mesh = useRef();

  let SIZE = 1.2;

  return (
    <>
      <mesh
        ref={mesh}
        position={[distance.x, distance.y, distance.z]}
        onPointerDown={() => {
          if (mobileBrowseSong?.id !== recommendation.id) {
            previewSong(song);
          } else {
            setSongSelection(recommendation.uri, accessToken)
              .then(() => {
                playSelectedTrack(
                  recommendation.uri,
                  accessToken,
                  setRecommendedTracks,
                  setCurrentSong,
                  currentDevice.id
                );
              })
              .then(() => {
                previewSong();
              });
          }
        }}
      >
        <boxBufferGeometry attach="geometry" args={[SIZE, SIZE, SIZE]} />
        <meshStandardMaterial attach="material" map={texture} />
      </mesh>
    </>
  );
};

export default SongMobile;
