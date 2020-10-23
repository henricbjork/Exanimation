import React, { useState, useEffect } from 'react';

import Track from '../Track';

import './SearchField.css';

const SearchField = ({
  accessToken,
  device,
  setRecommendedTracks,
  setCurrentSong,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);

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
        <input
          className='search-field'
          type='text'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {searchResult &&
        searchResult.map((result, i) => {
          return (
            <Track
              key={i}
              id={result.uri}
              accessToken={accessToken}
              device={device}
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
