import React, { useEffect, useState } from 'react';
import './Cursor.css';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Cursor({ stickeyCursor }) {
  const [isHover, setIsHover] = useState(false);
  const cursorSize = isHover ? 100 : 20;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const menMouse = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  const smoothOption = { damping: 50, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOption),
    y: useSpring(mouse.y, smoothOption),
  };

  const managedHover = () => {
    setIsHover(true);
  };
  const managedLeft = () => {
    setIsHover(false);
  };
  useEffect(() => {
    window.addEventListener('mousemove', menMouse);

    stickeyCursor.forEach((ref) => {
      ref.current.addEventListener('mouseover', managedHover);
      ref.current.addEventListener('mouseleave', managedLeft);
    });
    return () => {
      window.removeEventListener('mousemove', menMouse);
      stickeyCursor.forEach((ref) => {
        ref.current.removeEventListener('mouseover', managedHover);
        ref.current.removeEventListener('mouseleave', managedLeft);
      });
    };
  });

  return <motion.div className="cursor" style={{ left: smoothMouse.x, top: smoothMouse.y }} animate={{ width: cursorSize, height: cursorSize }}></motion.div>;
}

export default Cursor;
