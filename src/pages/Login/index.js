import React from 'react';

import './login.css';

import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import Icosahedron from '../../threefiber/components/Icosahedron/Icosahedron';

//Packages
import { navigate } from '@reach/router';
import { useSpring, a } from 'react-spring';

const LoginPage = () => {
  const url = `http://localhost:8888/login`;

  const props = useSpring({
    to: { width: '125px', opacity: 1 },
    from: { width: '0px', opacity: 0 },
    delay: 800,
  });

  return (
    <section className='sign-in-page'>
      <div className='sign-in-window'>
        <p className='title'>MusicBox</p>
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
