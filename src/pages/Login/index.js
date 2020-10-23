import React from 'react';

import './login.css';

//Components
// import Button from '../../components/Button';

//Packages
import { navigate } from '@reach/router';
import { useSpring, a } from 'react-spring';

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

  const props = useSpring({
    to: { width: '200px' },
    from: { width: '0px' },
    delay: 500,
  });

  return (
    <section>
      <div>
        <h1>Welcome to MusicBox</h1>
        <p>
          Enter a song of your choice and MusicBox
          <br /> will generate recommendations similar to that song. <br />
          <br />
          Sign in to Spotify to start exploring:
        </p>
        <a.button style={props} onClick={() => navigate(url)}>
          Sign in to spotify
        </a.button>
      </div>
    </section>
  );
};

export default LoginPage;
