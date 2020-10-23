import React from 'react';
import './Player.css';

const Player = ({ currentSong }) => {
  return (
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
  );
};

export default Player;
