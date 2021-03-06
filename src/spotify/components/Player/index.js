import React, { useState, useEffect } from 'react';
import ToggleDevice from '../ToggleDevice';
import Soundwave from '../Soundwave';
import PauseImg from '../../../assets/icons/pause.svg';
import PlayImg from '../../../assets/icons/play.svg';
import { playTrack } from '../../functions/playTrack';
import { pauseTrack } from '../../functions/pauseTrack';
import { getDevices } from '../../functions/getDevices';
import { queueTrack } from '../../functions/queueTrack';
import './Player.css';

const Player = ({
  currentSong,
  accessToken,
  currentDevice,
  setCurrentDevice,
  recommendedTracks,
  setRecommendedTracks,
  setCurrentSong,
}) => {
  const [paused, setPaused] = useState(false);
  const [devices, setDevices] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    setPaused(false);
  }, [currentSong]);

  useEffect(() => {
    getDevices(accessToken).then((devices) => {
      setDevices(devices.devices);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  return (
    <>
      <div className='player'>
        {devices.length > 1 &&
          ((paused && (
            <ToggleDevice
              devices={devices}
              currentDevice={currentDevice}
              setCurrentDevice={setCurrentDevice}
            />
          )) ||
            (!paused && (
              <div className='device-text'>
                <p>{currentDevice.name}</p>
                <Soundwave isPlaying={!paused} />
              </div>
            )))}
        {devices.length === 1 && (
          <div className='device-text'>
            <p>{currentDevice.name}</p>
            <Soundwave isPlaying={!paused} />
          </div>
        )}

        <div className='player-box'>
          <div className='cover-text-box'>
            <img
              className='current-album-cover'
              src={currentSong.album.image}
              alt={currentSong.album.name}
            />
            <div>
              <div className='current-text-song'>
                <p>{currentSong.song}</p>
              </div>
              <div className='current-text-artist'>
                <p>{currentSong.artist}</p>
              </div>
            </div>
            <img
              className='play-pause'
              src={paused ? PlayImg : PauseImg}
              onClick={() => {
                setPaused(!paused);
                paused
                  ? playTrack(
                      position.currentUri,
                      accessToken,
                      currentDevice.id,
                      position.progress
                    ) &&
                    queueTrack(
                      position.nextTrackUri,
                      accessToken,
                      setRecommendedTracks,
                      setCurrentSong,
                      currentDevice.id,
                      position.duration - position.progress
                    )
                  : pauseTrack(accessToken, recommendedTracks).then((res) => {
                      setPosition(res);
                      queueTrack(
                        res.currentUri,
                        accessToken,
                        setRecommendedTracks,
                        setCurrentSong,
                        currentDevice.id
                      );
                    });
              }}
              alt='play/pause'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
