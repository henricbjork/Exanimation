import React, { useState } from 'react';

import queryString from 'query-string';

import './App.css';
import { Router } from '@reach/router';

import HomePage from './pages/Home/home';
import LoginPage from './pages/Login/login';

function App() {
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchText, setSearchText] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(null);
  const [hover, setHover] = useState(false);

  const url = `
https://accounts.spotify.com/authorize?
client_id=5d27d394dabe48ceb3546e56bc892ada&
show_dialog=true&
response_type=token&
scope=user-modify-playback-state user-read-recently-played&
redirect_uri=http://localhost:3000`;

  const getAccessToken = () => {
    const parsed = queryString.parse(window.location.hash);
    if (parsed.access_token !== undefined) {
      return parsed.access_token;
    }
    return false;
  };

  const accessToken = getAccessToken();

  React.useEffect(() => {
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
    <div className='App'>
      <Router>
        <HomePage path='/' loggedIn={true} />
        <LoginPage path='/login' />
      </Router>
    </div>
  );
}

export default App;
