import React, { useEffect } from 'react';
import './login.css';

//Packages and functions
import { navigate } from '@reach/router';
import { useSpring, a } from 'react-spring';
import { addNoDevicesClassName } from '../../spotify/functions/addNoDevicesClassName';

const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
const url = `${backend_endpoint}/login`;

const LoginPage = () => {

  const props = useSpring({
    to: { width: '125px', opacity: 1 },
    from: { width: '0px', opacity: 0 },
    delay: 800,
  });

  useEffect(()=>{
    if(sessionStorage.getItem('noDevices')) {
      sessionStorage.removeItem('noDevices');
      addNoDevicesClassName();
    }
  }, [])

  return (
    <section className='sign-in-page'>
      <div className='sign-in-window'>
        <p className='title'>ICOSAHEDRON</p>
        <p className='app-info'>
          Play a song and ICOSAHEDRON
          <br /> will recommend you similar tracks
        </p>

        <p className='notice'>
          Ensure Spotify is running
          <br /> on your chosen device
        </p>
        <p className='no-devices-msg'>Your device is turned off</p>
        <p className='sign-in-msg'>Sign in to Spotify to start exploring</p>
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
