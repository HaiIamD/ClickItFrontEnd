import React, { useEffect, useRef, useState } from 'react';
import './Homepage.css';
import Navbar from '../../components/navbar/Navbar';
import { useScroll, useTransform, motion } from 'framer-motion';
import Cursor from '../../components/Cursor/Cursor';
import Fotter from '../../components/Fotter/Fotter';
import { latter, latterAnimated, image } from './animation';
import { Link } from 'react-router-dom';

function Homepage() {
  const container = useRef(null);

  const { scrollYProgress: scrollYProgressContainer } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgressContainer, [0, 1], [0.5, 2]);
  const scale5 = useTransform(scrollYProgressContainer, [0, 1], [0.5, 2.5]);
  const scale6 = useTransform(scrollYProgressContainer, [0, 1], [0.5, 3.5]);
  const scale7 = useTransform(scrollYProgressContainer, [0, 1], [0.5, 4.5]);
  const scale8 = useTransform(scrollYProgressContainer, [0, 1], [0.5, 5.5]);

  const stickeyCursor = useRef(Array.from({ length: 6 }, () => useRef(null)));
  console.log(stickeyCursor);

  // Navbar Ref For background
  const [atHeader, setAtHeader] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (headerRef.current) {
        const { top } = headerRef.current.getBoundingClientRect();
        setAtHeader(top <= 0);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar ref={stickeyCursor.current[0]} atHeader={atHeader} />
      <Cursor stickeyCursor={stickeyCursor.current} />
      <div className="d-flex justify-content-center">
        <div className="warnaBackground2"></div>
      </div>
      {/* Header Side */}
      <motion.div variants={latter} initial="initial" animate="animate" className="homePage">
        <motion.div variants={latterAnimated} className="titleHomePage">
          ClickIt
        </motion.div>

        <motion.p variants={latterAnimated} className="subTitleHomePage mt-3 px-2">
          A Collective Decision-Making Platform - Discover solutions collectively with your friends through easy and quick polling.
        </motion.p>

        <motion.a variants={latterAnimated} href="/userLogin" ref={stickeyCursor.current[1]} className="subtitleHomePageMini mt-3">
          Try ClickIt, Click Here
        </motion.a>
      </motion.div>
      <div ref={container} className="containerRelative">
        <motion.div variants={latter} initial="initial" animate="animate" className=" imageBorder ">
          <motion.div variants={image} className="absoluteCoverImage " style={{ scale: scale4 }}>
            <div className="headerImage" ref={headerRef}>
              <img src="assets/loginimage.jpg" alt="header Image" className="img-fluid image" />
            </div>
          </motion.div>
          <motion.div variants={image} className="absoluteCoverImage " style={{ scale: scale5 }}>
            <div className="headerImage2">
              <img src="assets/galery0.jpg" alt="header Image" className="img-fluid image" />
            </div>
          </motion.div>
          <motion.div variants={image} className="absoluteCoverImage " style={{ scale: scale6 }}>
            <div className="headerImage3">
              <img src="assets/galery1.jpg" alt="header Image" className="img-fluid image" />
            </div>
          </motion.div>
          <motion.div variants={image} className="absoluteCoverImage " style={{ scale: scale7 }}>
            <div className="headerImage4">
              <img src="assets/galery2.jpg" alt="header Image" className="img-fluid image" />
            </div>
          </motion.div>
          <motion.div variants={image} className="absoluteCoverImage " style={{ scale: scale8 }}>
            <div className="headerImage5">
              <img src="assets/galery3.jpg" alt="header Image" className="img-fluid image" />
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/*  Image Side */}

      <div className="HeadContainer">
        <div className="container">
          {/*  Body Side */}
          <div className="BodySide d-flex flex-wrap">
            <div className="col-12 col-lg-6">
              <div className="bodyImageBorder" ref={stickeyCursor.current[5]}>
                <img src="assets/image5.jpg" alt="BodyImage" className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-lg-6  d-flex flex-wrap align-items-center justify-content-center">
              <p className="textBodySide">
                Hello, welcome to ClickIt, an exceptional online polling platform offering a myriad of outstanding features and functionalities.
              </p>
            </div>
          </div>
          {/* Bento Side */}
          <div className="bentoSide">
            <div className="kotakTitleBento d-flex flex-wrap justify-content-center">
              <span className="textBodySide titleBentoSide ">
                We've created a polling website with a real-time commenting feature, enabling instant communication and feedback on polls.
              </span>
            </div>
            <div className="d-flex flex-wrap ">
              <div className="col-12 col-sm-8 col-xl-6 bento " ref={stickeyCursor.current[2]}>
                <motion.div className="bentoInsideOne  d-flex flex-wrap justify-content-between " style={{ backgroundImage: 'url(assets/iamge2.jpg)' }}>
                  <span className="d-flex flex-wrap align-items-end ">
                    <p className=" firstbento ">Features of ClickIt</p>
                  </span>
                </motion.div>
              </div>
              <div className="col-12 col-sm-4 col-xl-3 bento ">
                <motion.div className="bentoInside d-flex flex-column justify-content-between">
                  <div>
                    <span className="number">02</span> <hr />
                  </div>
                  <span className="textBodySide">Privacy and Security Guarantee</span>
                </motion.div>
              </div>
              <div className="col-12 col-sm-5 col-xl-3 bento ">
                <motion.div className="bentoInside d-flex flex-column justify-content-between">
                  <div>
                    <span className="number">03</span> <hr />
                  </div>
                  <span className="textBodySide">Live Comentar in Pollings Forum</span>
                </motion.div>
              </div>
              <div className="col-12 col-sm-7 col-xl-6 bento ">
                <motion.div className="bentoInside d-flex flex-column justify-content-between">
                  <div>
                    <span className="number">04</span> <hr />
                  </div>
                  <span className="textBodySide">Customizable Polls</span>
                </motion.div>
              </div>
              <div className="col-12 col-xl-6 bento ">
                <motion.div className="bentoInside d-flex flex-column justify-content-between">
                  <div>
                    <span className="number">05</span> <hr />
                  </div>
                  <span className="textBodySide">Join as User or Guest</span>
                </motion.div>
              </div>
            </div>
          </div>
          {/* Join withUs side */}
          <div className="d-flex flex-wrap  ">
            <div className="col-12 d-flex flex-wrap justify-content-between  my-5">
              <div className=" col-12 col-xl-5 textBodySide titleJoinWithUs  rounded-2 px-4 py-3 d-flex align-items-center">Let's join with us</div>
              <span className="col-12 col-xl-6 textJoin  ">Let’s Join over 100+ other users in engaging discussions on a variety of enjoyable topics.</span>
            </div>
            <div className="col-12 d-flex flex-wrap justify-content-center">
              <a href={'/guestLogin'} className="col-12 col-lg-4 px-1 my-2" style={{ textDecoration: 'none', overflow: 'hidden' }}>
                <div
                  className=" imageBackground d-flex  align-items-end justify-content-center"
                  style={{ backgroundImage: 'url(assets/image1.jpg)' }}
                  ref={stickeyCursor.current[3]}
                >
                  <span className="buttonLoginJoin py-4 col-12">Join as guest</span>
                </div>
              </a>
              <a href={'/userLogin'} className="col-12 col-lg-8 px-1 my-2" style={{ textDecoration: 'none', overflow: 'hidden' }}>
                <div
                  className=" imageBackground d-flex  align-items-end justify-content-center"
                  style={{ backgroundImage: 'url(assets/image4.jpg)' }}
                  ref={stickeyCursor.current[4]}
                >
                  <span className="buttonLoginJoin py-4 col-12">Join as user</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*  Fotter */}

      <Fotter />
    </div>
  );
}

export default Homepage;
