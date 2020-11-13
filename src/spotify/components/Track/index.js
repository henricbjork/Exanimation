import React from 'react';
import './Track.css';
import { playSelectedTrack } from '../../functions/playSelectedTrack';
import { clearSearchField } from '../../functions/clearSearchField';

const Track = ({uri, accessToken, currentDevice, setCurrentSong, setRecommendedTracks, image, artist, track}) => {
  return (
    <div
      className='search-item-box'
      onClick={() => {
        playSelectedTrack(
          uri,
          accessToken,
          setRecommendedTracks,
          setCurrentSong,
          currentDevice.id
        );
        clearSearchField();
      }}
    >
      <div className='track-container'>
        <img className='search-item-cover' src={image} alt='track' />
        <div className='search-text-field'>
          <p className='search-track'>{track}</p>
          <p className='search-artist'>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Track;
