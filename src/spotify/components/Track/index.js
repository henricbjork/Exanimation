import React from 'react';
import './Track.css';
import { navigate } from '@reach/router';
import { setSongSelection } from '../../functions/setSongSelection';
import { playSelectedTrack } from '../../functions/playSelectedTrack';
import { clearSearchField } from '../../functions/clearSearchField';

const Track = ({uri, accessToken, currentDevice, setCurrentSong, setRecommendedTracks, image, artist, track}) => {

  if(currentDevice===undefined) {
    const base_url = process.env.REACT_APP_BASE_URL;
    sessionStorage.setItem('noDevices', true);
    navigate(`${base_url}/login`);
  }

  return (
    <div
      className='search-item-box'
      onClick={() => {
        setSongSelection(uri, accessToken).then(()=> {
          playSelectedTrack(
            uri,
            accessToken,
            setRecommendedTracks,
            setCurrentSong,
            currentDevice.id
          );
          clearSearchField();
        })
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
