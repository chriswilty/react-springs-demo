import React, { useEffect } from 'react';
import { animated, useSpring } from 'react-spring/hooks';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Gooey />
    </div>
  );
};

const Gooey = () => {
  const [ { pos1 }, setSpring ] = useSpring(() => ({ pos1: [0,0], config: fast }));
  const { pos2 } = useSpring({ pos2: pos1, config: medium });
  const { pos3 } = useSpring({ pos3: pos2, config: slow });

  const translatePos = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY, view }) => {
      // Blobs are positioned relative to the containing box. Confine blobs within box by
      // preventing them being positioned outside of range (0..boxWidth).
      const x = Math.min(boxWidth, Math.max(0, clientX - ((view.innerWidth - boxWidth) / 2)));
      const y = Math.min(boxHeight, Math.max(0, clientY - ((view.innerHeight - boxHeight) / 2)));
      setSpring({ pos1: [x, y] });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
      <>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="25" />
            <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -7" />
          </filter>
        </svg>
        <div className="gooey" style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}>
          <div className="blob-filter">
            <animated.div className="blob1" style={{ transform: pos3.interpolate(translatePos) }} />
            <animated.div className="blob2" style={{ transform: pos2.interpolate(translatePos) }} />
            <animated.div className="blob3" style={{ transform: pos1.interpolate(translatePos) }} />
          </div>
        </div>
      </>
  );
};

const fast = { tension: 500, friction: 50 };
const medium = { tension: 180, friction: 40 };
const slow = { tension: 120, friction: 50 };
const boxWidth = 500;
const boxHeight = 400;

export default App;
