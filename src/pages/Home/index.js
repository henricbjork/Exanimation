import React, { useState, useEffect } from 'react';

//Packages
import { Canvas } from 'react-three-fiber';
import Icosahedron from '../../threefiber/components/Icosahedron';
import { OrbitControls } from 'drei';
import { Redirect } from '@reach/router';

//Components
import Track from '../../spotify/components/Track';
import SearchField from '../../spotify/components/SearchField';

//Functions
import { getAccessToken } from '../../spotify/functions/getAccessToken';
import { getDevices } from '../../spotify/functions/getDevices';

//CSS
import './home.css';

const HomePage = () => {
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [device, setDevice] = useState(null);
  const accessToken = getAccessToken();

  if (accessToken) {
    getDevices(accessToken)
      .then((devices) => {
        setDevice(devices.devices[0].id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const url = `https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=6`;

    if (searchText === '' || searchText === ' ') {
      setSearchResult(null);
      return;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((queryResult) => queryResult.json())
      .then((json) => {
        setSearchResult(json.tracks.items);
      });
  }, [accessToken, searchText]);

  if (!accessToken) {
    return <Redirect from='' to='/login' noThrow />;
  }

  // Vector3 {x: 4.205848693847656, y: -6.805206298828125, z: 0, isVector3: true}x: 4.205848693847656y: -6.805206298828125z: 0isVector3: true__proto__: Object

  return (
    <>
      <Canvas camera={{ position: [0, 0, 120], fov: 10 }}>
        <OrbitControls autoRotate='true' autoRotateSpeed='0.5' />
        <ambientLight />
        <Icosahedron
          recommendations={recommendedTracks}
          setCurrentSong={setCurrentSong}
          setRecommendedTracks={setRecommendedTracks}
          accessToken={accessToken}
          device={device}
        />
      </Canvas>

      {accessToken && (
        <div className='home'>
          <SearchField handleOnChange={(e) => setSearchText(e.target.value)} />
          {searchResult &&
            searchResult.map((result, i) => {
              return (
                <Track
                  key={i}
                  id={result.uri}
                  accessToken={accessToken}
                  device={device}
                  setCurrentSong={setCurrentSong}
                  setRecommendedTracks={setRecommendedTracks}
                  image={result.album.images[0].url}
                  artist={result.artists[0].name}
                  track={result.name}
                />
              );
            })}
          {currentSong && (
            <div className='player'>
              <h2>Currently Playing</h2>
              <div className='cover-text-box'>
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
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
