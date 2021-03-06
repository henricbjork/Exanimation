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
import { parseAccessToken } from '../../spotify/functions/parseAccessToken';
import { parseRefreshToken } from '../../spotify/functions/parseRefreshToken';
import { getDevices } from '../../spotify/functions/getDevices';
import { playSelectedTrack } from './../../spotify/functions/playSelectedTrack';

//CSS
import './home.css';

// Override console warn
window.console.warn = function () {};

let accessToken;

const HomePage = () => {
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [mobileBrowseSong, setMobileBrowseSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  if (parseRefreshToken() && !accessToken) {
    const refreshToken = parseRefreshToken();
    sessionStorage.setItem('refreshToken', refreshToken);
  }
  accessToken = parseAccessToken();

  useEffect(() => {
    if (sessionStorage.getItem('queuedTrackUri') !== null && currentDevice) {
      const queuedTrackUri = sessionStorage.getItem('queuedTrackUri');
      playSelectedTrack(
        queuedTrackUri,
        accessToken,
        setRecommendedTracks,
        setCurrentSong,
        currentDevice.id
      );
    }
  }, [currentDevice]);

  useEffect(() => {
    if (accessToken) {
      getDevices(accessToken).then((devices) => {
        setCurrentDevice(devices.devices[0]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    });
  });

  if (!accessToken) {
    return <Redirect from="" to="/login" noThrow />;
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 120], fov: 10 }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <OrbitControls autoRotate autoRotateSpeed="0.5" />
        <ambientLight position={[50, 50, 50]} />
        <Icosahedron
          recommendedTracks={recommendedTracks}
          setCurrentSong={setCurrentSong}
          setRecommendedTracks={setRecommendedTracks}
          accessToken={accessToken}
          currentDevice={currentDevice}
          windowSize={windowSize}
          mobileBrowseSong={mobileBrowseSong}
          setMobileBrowseSong={setMobileBrowseSong}
        />
      </Canvas>
      {accessToken && (
        <div className="home">
          <SearchField
            accessToken={accessToken}
            currentDevice={currentDevice}
            setCurrentSong={setCurrentSong}
            setRecommendedTracks={setRecommendedTracks}
          />
          {windowSize.width <= 700 && mobileBrowseSong !== null && (
            <div className="song-frame">
              <img src={mobileBrowseSong?.images[2].url} alt="song" />
              <div>
                <div className="recommendation-text-song">
                  <p>{mobileBrowseSong?.title}</p>
                </div>
                <div className="recommendation-text-artist">
                  <p>{mobileBrowseSong?.artist}</p>
                </div>
              </div>
            </div>
          )}
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
