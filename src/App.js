import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { playSelected } from './spotify/functions/playSelected';
import Icosahedron from './threefiber/components/Icosahedron';
import queryString from 'query-string';
import './App.css';
// let songCount = 0;

function App() {
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  // const [completedTracks, setCompletedTracks] = useState(null);
  // let timer;
  // let limit;

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

  // function fetchRecommendations(id) {
  //   if (!accessToken) return;
  //   return new Promise(function (resolve, reject) {
  //     const rootUrl = 'https://api.spotify.com/v1';
  //     fetch(`${rootUrl}/recommendations?seed_tracks=${id}&limit=12`, {
  //       headers: {
  //         Authorization: 'Bearer ' + accessToken,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((recommend) => {
  //         setRecommendedTracks(recommend.tracks);
  //         resolve(recommend.tracks);
  //       });
  //   });
  // }

  // function playSong(uri) {
  //   if (!accessToken) return;
  //   return new Promise(function (resolve, reject) {
  //     const rootUrl = 'https://api.spotify.com/v1';
  //     fetch(`${rootUrl}/me/player/play`, {
  //       method: 'PUT',
  //       body: JSON.stringify({ uris: [`${uri}`] }),
  //       headers: {
  //         Authorization: 'Bearer ' + accessToken,
  //       },
  //     }).then(() => {
  //       resolve();
  //     });
  //   });
  // }

  // function fetchCurrent() {
  //   if (!accessToken) return;
  //   return new Promise(function (resolve, reject) {
  //     const rootUrl = 'https://api.spotify.com/v1';
  //     setTimeout(() => {
  //       fetch(`${rootUrl}/me/player/currently-playing`, {
  //         headers: {
  //           Authorization: 'Bearer ' + accessToken,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((current) => {
  //           resolve(current);
  //         });
  //     }, 500); // delay ensures song is playing before fetch takes place / promise runs faster than Spotify
  //   });
  // }

  // const playSelected = (uri) => {
  //   if (!accessToken) return;
  //   playSong(uri).then(() => {
  //     fetchCurrent().then((current) => {
  //       // console.log(current);
  //       console.log(
  //         'Currently playing: ' +
  //           current.item.artists[0].name +
  //           ' - ' +
  //           current.item.name
  //       );
  //       setCurrentSong({
  //         id: current.item.id,
  //         artist: current.item.artists[0].name,
  //         song: current.item.name,
  //         album: {
  //           image: current.item.album.images[0].url,
  //           name: current.item.album.name,
  //         },
  //       });
  //       fetchRecommendations(current.item.id);
  // .then((res)=> {
  // return res;
  // }).then((recommendTracks)=> {
  // timer = setTimeout(() => {
  // const track = recommendTracks[Math.floor(Math.random() * recommendTracks.length)];
  // songCount+=1;
  // console.log(track);
  // playSelected(track.uri);
  // }, current.item.duration_ms - current.progress_ms); // 1000ms delay required to ensure next track is playing when useEffect/fetch is triggered
  // })
  // fetchHistory();
  //     });
  //   });
  // };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 120], fov: 10 }}>
        <OrbitControls />
        <ambientLight />
        <Icosahedron recommendations={recommendedTracks} setCurrentSong={setCurrentSong} setRecommendedTracks={setRecommendedTracks} accessToken={accessToken} />
      </Canvas>

      <div className='App'>
        {!accessToken && (
          <a href={url} onClick={getAccessToken}>
            Authorize
          </a>
        )}
        {accessToken && !currentSong && (
          <button
            onClick={() => playSelected('spotify:track:2oNabuaEPsfuNu6qLpdAvc', accessToken, setRecommendedTracks, setCurrentSong)}
          >
            Play
          </button>
        )}
        {currentSong && <h2>Currently Playing</h2>}
        {currentSong && (
          <img
            className='current-album-cover'
            src={currentSong.album.image}
            alt={currentSong.album.name}
          />
        )}
        {currentSong && (
          <h3>
            {currentSong.artist} - {currentSong.song}
          </h3>
        )}
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
    //   {recommendedTracks && <h2>Recommended Tracks</h2>}
    //   {recommendedTracks &&
    //     recommendedTracks.map((track, i) => {
    //       return (
    //         <div
    //           key={i}
    //           onClick={() => {
    //             clearTimeout(timer);
    //             playSelected(track.uri);
    //           }}
    //         >
    //           <img
    //             className='album-cover'
    //             src={track.album.images[0].url}
    //             alt={track.album.name}
    //           />
    //           <h4>
    //             {track.artists[0].name} - {track.name}
    //           </h4>
    //         </div>
    //       );
    //     })}
    // </div>
  );
}

export default App;
