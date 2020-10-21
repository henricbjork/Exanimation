import React from 'react';
import './Track.css';

const Track = (props) => {
  return (
    <div className="search-item-box">
      <img className="search-item-cover" src={props.image} alt="track"/>
      <div className="search-text-field">
          <p className="search-track">{props.track}</p>
          <p className="search-artist">{props.artist}</p>
      </div>
    </div>
  )
};

export default Track;
