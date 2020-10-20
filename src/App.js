import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { playSelected } from './spotify/functions/playSelected';
import Icosahedron from './threefiber/components/Icosahedron';
import queryString from 'query-string';
import './App.css';

function App() {
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const url = `
https://accounts.spotify.com/authorize?
client_id=5d27d394dabe48ceb3546e56bc892ada&
show_dialog=true&
response_type=token&
scope=user-modify-playback-state user-read-recently-played&
redirect_uri=http://localhost:3000`;

  const getAccessToken = () => {
    const parsed = queryString.parse(window.location.hash);
    if (parsed.access_token !== undefined) {
      return parsed.access_token;
    }
    return false;
  };

  const accessToken = getAccessToken();

  // const fetchHistory = () => {
  //   if (songCount === 0) return;
  //   if (songCount > 50) {
  //     limit = 50;
  //   } else {
  //     limit = songCount;
  //   }
  //   const rootUrl = 'https://api.spotify.com/v1';
  //   fetch(`${rootUrl}/me/player/recently-played?limit=${limit}`, {
  //     headers: {
  //       Authorization: 'Bearer ' + accessToken
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((history) => {
  //     setCompletedTracks(history.items);
  //   })
  // }

  const [hover, setHover] = useState(false);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 120], fov: 10 }}>
        <OrbitControls autoRotate={!hover} autoRotateSpeed='0.5' />
        <ambientLight />
        <Icosahedron
          recommendations={recommendedTracks}
          setCurrentSong={setCurrentSong}
          setRecommendedTracks={setRecommendedTracks}
          accessToken={accessToken}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
        />
      </Canvas>

      <div className='App'>
        {!accessToken && (
          <a href={url} onClick={getAccessToken}>
            Authorize
          </a>
        )}
        {accessToken && !currentSong && (
          <button
            onClick={() =>
              playSelected(
                'spotify:track:10vpPP0rDTRNJmQyvxyNRz',
                accessToken,
                setRecommendedTracks,
                setCurrentSong
              )
            }
          >
            Play
          </button> // spotify:track:2oNabuaEPsfuNu6qLpdAvc
        )}
        {currentSong && <h2>Currently Playing</h2>}
        <div className="player">
          {currentSong && (
            <img
              className='current-album-cover'
              src={currentSong.album.image}
              alt={currentSong.album.name}
            />
          )}
          {currentSong && (
            <div>
              <p>{currentSong.artist}</p>
              <p>{currentSong.song}</p>
            </div>
          )}
        </div>
      </div>
    </>
    // //  {completedTracks && <h2>Completed Tracks</h2>}
    // //   {completedTracks &&
    //       completedTracks.map((track, i) => {
    //         return (
    //           <div className="completed-div" key={i} onClick={()=>{clearTimeout(timer);playSelected(track.track.uri);}}>
    //           <img className="completed-album-cover" src={track.track.album.images[0].url} alt={track.track.album.name}/>
    //           <h4>{track.track.artists[0].name} - {track.track.name}</h4>
    //           </div>
    //         );
    //       })}
  );
}

export default App;
