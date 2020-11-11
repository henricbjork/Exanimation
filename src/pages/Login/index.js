import React from 'react';
import './login.css';

//Packages
import { navigate } from '@reach/router';
import { useSpring, a } from 'react-spring';

const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

const LoginPage = () => {
  const url = `${backend_endpoint}/login`;

  const props = useSpring({
    to: { width: '200px' },
    from: { width: '0px' },
    delay: 500,
  });

  return (
    <section className='sign-in-page'>
      <div>
        <h1 className='title'>Welcome to MusicBox</h1>
        <p className='app-info'>
          Enter a song of your choice and MusicBox
          <br /> will generate recommendations similar to that song. <br />
          <br />
          Sign in to Spotify to start exploring:
        </p>
        <a.button
          className='sign-in-btn'
          style={props}
          onClick={() => navigate(url)}
        >
          Sign in to spotify
        </a.button>
      </div>
    </section>
  );
};

export default LoginPage;
