import React from 'react';
import './login.css';

//Packages
import { navigate } from '@reach/router';
import { useSpring, a } from 'react-spring';

const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

const LoginPage = () => {
  const url = `${backend_endpoint}/login`;

  const props = useSpring({
    to: { width: '125px', opacity: 1 },
    from: { width: '0px', opacity: 0 },
    delay: 800,
  });

  return (
    <section className='sign-in-page'>
      <div className='sign-in-window'>
        <p className='title'>Musicbox</p>
        <p className='app-info'>
          Enter a song of your choice and MusicBox
          <br /> will generate recommendations
          <br /> similar to that song.
        </p>

        <p className='notice'>
          Make sure that you have Spotify
          <br /> running in the background
        </p>

        <p className='sign-in-msg'>Sign in to Spotify to start exploring:</p>
        <a.button
          className='sign-in-btn'
          style={props}
          onClick={() => navigate(url)}
        >
          Sign in
        </a.button>
      </div>
    </section>
  );
};

export default LoginPage;
