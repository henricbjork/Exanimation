import React, { useEffect, useState } from 'react';

//Packages
import { Canvas } from 'react-three-fiber';
import Icosahedron from '../../threefiber/components/Icosahedron';
import { OrbitControls } from 'drei';
import { Redirect } from '@reach/router';

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
  const [device, setDevice] = useState(null);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
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

  // Vector3 {x: 4.205848693847656, y: -6.805206298828125, z: 0, isVector3: true}x: 4.205848693847656y: -6.805206298828125z: 0isVector3: true__proto__: Object

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 120], fov: 10 }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <OrbitControls autoRotate='true' autoRotateSpeed='0.5' />
        <ambientLight />
        <Icosahedron
          recommendations={recommendedTracks}
          setCurrentSong={setCurrentSong}
          setRecommendedTracks={setRecommendedTracks}
          accessToken={accessToken}
          device={device}
          windowSize={windowSize}
        />
      </Canvas>
      {accessToken && (
        <div className='home'>
          <SearchField
            accessToken={accessToken}
            device={device}
            setCurrentSong={setCurrentSong}
            setRecommendedTracks={setRecommendedTracks}
          />
        </div>
      )}
      {currentSong && (
        <Player
          currentSong={currentSong}
          accessToken={accessToken}
          device={device}
        />
      )}
    </>
  );
};

export default HomePage;
