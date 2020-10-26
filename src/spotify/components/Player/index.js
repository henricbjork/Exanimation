import React, { useState, useEffect } from 'react';
import './Player.css';
import PauseImg from './../../../assets/icons/pause.svg';
import PlayImg from './../../../assets/icons/play.svg';
import { playSong } from '../../functions/playSong';
import { pauseTrack } from '../../functions/pauseTrack';

const Player = ({ currentSong, accessToken, device }) => {
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    setPaused(false);
  }, [currentSong]);

  return (
    <div className='player'>
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
      <img
        className='play-pause'
        src={paused ? PlayImg : PauseImg}
        onClick={() => {
          setPaused(!paused);
          paused
            ? playSong(position.uri, accessToken, device, position.position)
            : pauseTrack(accessToken).then((res) => {
                setPosition(res);
              });
        }}
      />
    </div>
  );
};

export default Player;
