import React from 'react';

import './Login.css';

//Components
// import Button from '../../components/Button';

//Packages
import { navigate } from '@reach/router';

const LoginPage = () => {
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT;
  const url = `
https://accounts.spotify.com/authorize?
client_id=${clientId}
show_dialog=true&
response_type=token&
scope=user-modify-playback-state user-read-recently-played&
redirect_uri=${redirectUri}`;

  return (
    <div className='login-page'>
      <h1>Welcome to MusicBox</h1>
      <button onClick={() => navigate(url)}>Login to spotify</button>
    </div>
  );
};

export default LoginPage;
