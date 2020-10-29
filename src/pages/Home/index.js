import React, { useEffect, useState } from 'react';

//Packages
import { Canvas, useResource } from 'react-three-fiber';
import Icosahedron from '../../threefiber/components/Icosahedron/Icosahedron';
import { OrbitControls } from 'drei';
import { Redirect } from '@reach/router';
import * as THREE from 'three';

//Components
import SearchField from '../../spotify/components/SearchField';
import Player from '../../spotify/components/Player';

//Functions
import { getAccessToken } from '../../spotify/functions/getAccessToken';
import { getDevices } from '../../spotify/functions/getDevices';

//CSS
import './home.css';

const HomePage = () => {
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      getDevices(accessToken)
        .then((devices) => {
          setCurrentDevice(devices.devices[0]);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });
  });

  if (!accessToken) {
    return <Redirect from='' to='/login' noThrow />;
  }


  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 120], fov: 10 }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <OrbitControls autoRotate autoRotateSpeed='0.5' />
        <spotLight position={[50, 50, 50]} />
        <Icosahedron
          recommendedTracks={recommendedTracks}
          setCurrentSong={setCurrentSong}
          setRecommendedTracks={setRecommendedTracks}
          accessToken={accessToken}
          currentDevice={currentDevice}
          windowSize={windowSize}
        />
      </Canvas>
      {accessToken && (
        <div className='home'>
          <SearchField
            accessToken={accessToken}
            currentDevice={currentDevice}
            setCurrentSong={setCurrentSong}
            setRecommendedTracks={setRecommendedTracks}
          />
        </div>
      )}
      {currentSong && (
        <Player
          accessToken={accessToken}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          currentDevice={currentDevice}
          setCurrentDevice={setCurrentDevice}
          recommendedTracks={recommendedTracks}
          setRecommendedTracks={setRecommendedTracks}
        />
      )}
    </>
  );
};

export default HomePage;
