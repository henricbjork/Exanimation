import React from 'react';
import { useSpring, a } from 'react-spring';
import './Soundwave.css';

const items = [1, 2, 3];

const Soundwave = ({ isPlaying }) => {
  return (
    <div className='bars'>
      {isPlaying &&
        items.map((i) => {
          return <div key={i} className='bar' />;
        })}
    </div>
  );
};

export default Soundwave;
