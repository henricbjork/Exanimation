import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Soundwave.css';

const items = [1, 2, 3];
const interp = (i) => (r) =>
  `translate3d(0, ${2 * Math.sin(r + (i * 100 * Math.PI) / 1.2)}px, 0)`;

const Soundwave = () => {
  const { radians } = useSpring({
    to: async (next) => {
      while (1) await next({ radians: 2 * Math.PI });
    },
    from: { radians: 0 },
    config: { duration: 1000 },
    reset: true,
  });
  return items.map((i) => (
    <animated.div
      key={i}
      className='script-bf-box'
      style={{ transform: radians.interpolate(interp(i)) }}
    />
  ));
};

export default Soundwave;
