import React, { useState, useEffect, useRef } from 'react';

import Track from '../Track';
import searchIcon from '../../../assets/icons/search.svg';
import { useSpring, a } from 'react-spring';

import './SearchField.css';

const SearchField = ({
  accessToken,
  currentDevice,
  setRecommendedTracks,
  setCurrentSong,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [clicked, setClicked] = useState(false);
  const searchField = useRef(null);

  const inputStyle = useSpring({
    to: clicked && { cursor: 'text' },
    from: !clicked && { cursor: 'pointer' },
  });

  useEffect(() => {
    const url = `https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=6`;

    if (searchText === '' || searchText === ' ') {
      setSearchResult(null);
      return;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((queryResult) => queryResult.json())
      .then((json) => {
        setSearchResult(json.tracks.items);
      });
  }, [accessToken, searchText]);

  return (
    <>
      <div className='search-box'>
        <a.input
          ref={searchField}
          className='search-field'
          type='text'
          style={inputStyle}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={(e) => setClicked(true)}
        />
        <img src={searchIcon} alt='search' className='search-icon' />
      </div>
      {searchResult &&
        searchResult.map((result, i) => {
          return (
            <Track
              key={i}
              uri={result.uri}
              accessToken={accessToken}
              currentDevice={currentDevice}
              setCurrentSong={setCurrentSong}
              setRecommendedTracks={setRecommendedTracks}
              image={result.album.images[0].url}
              artist={result.artists[0].name}
              track={result.name}
            />
          );
        })}
    </>
  );
};

export default SearchField;
