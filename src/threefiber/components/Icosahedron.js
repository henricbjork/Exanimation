import React from 'react';
import * as THREE from 'three';
import Song from './Song';


const Icosahedron = ({ recommendations, setCurrentSong, setRecommendedTracks, accessToken }) => {
  const vertices = new THREE.IcosahedronGeometry(4).vertices;

  return (
    <>
      <mesh scale={[2, 2, 2]} >
        <icosahedronBufferGeometry attach='geometry' />
        <meshBasicMaterial attach='material' wireframe />
      </mesh>
      {recommendations &&
        recommendations.map((recommendation, i) => {
          return (
            <Song
              key={i}
              distance={vertices[i]}
              imageUrl={recommendation.album.images[0].url}
              setCurrentSong={setCurrentSong} setRecommendedTracks={setRecommendedTracks} accessToken={accessToken}
              recommendation={recommendation}
            />
          );
        })}
    </>
  );
};

export default Icosahedron;
