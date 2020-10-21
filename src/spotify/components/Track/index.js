import React from 'react';
import './Track.css';
import { playSelected } from './../../functions/playSelected';
import { clearSearchField } from '../../functions/clearSearchField';

const Track = (props) => {
  return (
    <div className="search-item-box" onClick={() => {
      playSelected(
        props.id,
        props.accessToken,
        props.setRecommendedTracks,
        props.setCurrentSong
      );
      clearSearchField();
    }
    }>
      <img className="search-item-cover" src={props.image} alt="track"/>
      <div className="search-text-field">
          <p className="search-track">{props.track}</p>
          <p className="search-artist">{props.artist}</p>
      </div>
    </div>
  )
};

export default Track;
