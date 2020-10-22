import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { getDevices } from './spotify/functions/getDevices';
import Icosahedron from './threefiber/components/Icosahedron';
import queryString from 'query-string';
import Track from './spotify/components/Track';
import './App.css';

function App() {
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(null);
  const [hover, setHover] = useState(false);
  const [device, setDevice] = useState(null);

  const url = `
https://accounts.spotify.com/authorize?
client_id=5d27d394dabe48ceb3546e56bc892ada&
show_dialog=true&
response_type=token&
scope=user-modify-playback-state user-read-playback-state user-read-recently-played&
redirect_uri=http://localhost:3000`;

  const getAccessToken = () => {
    const parsed = queryString.parse(window.location.hash);
    if (parsed.access_token !== undefined) {
      getDevices(parsed.access_token)
      .then((devices)=>{
        setDevice(devices.devices[0].id)
      })
      return parsed.access_token;
      // .catch((error)=> {
      //   console.log(error.message); // inform the user to open Spotify on the device they wish to play from
      // });

    }
    return false;
  };

  const accessToken = getAccessToken();

  React.useEffect(() => {
    const url = `https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=6`;

    if (searchText === "" || searchText === " ") {
      setSearchResult(null);
      return;
    }

    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    })
    .then((queryResult) => queryResult.json())
    .then((json) => {
        setSearchResult(json.tracks.items);
    })
}, [accessToken, searchText]);

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
          device={device}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
        />
      </Canvas>

      {!accessToken && <div className="accessToken">
        <a href={url} onClick={getAccessToken}>
          Authorise
        </a>
      </div>}

      {accessToken && <div className='App'>

        <div className="search-box">
          <input className="search-field" type="text" onChange={(e) => setSearchText(e.target.value)} />
          {searchResult && searchResult.map((result, i) => {
              return <Track
              key={i}
              id={result.uri}
              device={device}
              accessToken={accessToken}
              setCurrentSong={setCurrentSong}
              setRecommendedTracks={setRecommendedTracks}
              image={result.album.images[0].url}
              artist={result.artists[0].name}
              track={result.name} />
          })}
        </div>

        {currentSong && <div className="player">
          <h2>Currently Playing</h2>
          <div className="cover-text-box">
            <img
                className='current-album-cover'
                src={currentSong.album.image}
                alt={currentSong.album.name}
            />
            <div>
              <p>{currentSong.song}</p>
              <p>{currentSong.artist}</p>
            </div>
          </div>
        </div>}

      </div>}

    </>
  );
}

export default App;
