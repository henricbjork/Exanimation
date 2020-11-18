import React, { useEffect } from 'react';
import './login.css';

//Packages and functions
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
          <br /> will recommend similar tracks
        </p>

        <p className='notice'>
          Please ensure Spotify is running
          <br /> on your device
        </p>
        <p className='no-devices-msg'>Your device is turned off</p>
        <p className='sign-in-msg'>Sign in to start exploring</p>
        <a.button
          className='sign-in-btn'
          style={props}
          onClick={() => {window.location.href = url;}}
        >
          Sign in
        </a.button>
      </div>
    </section>
  );
};

export default LoginPage;
