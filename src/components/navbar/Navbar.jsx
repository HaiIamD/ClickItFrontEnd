import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../state/redux';

const Navbar = forwardRef(function index({ atHeader, ...props }, ref) {
  const [active, setActive] = useState(false);

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const buttonVariants = {
    open: { opacity: 0, y: 100 },
    closed: { opacity: 1, y: 0 },
  };

  const varians = {
    open: {
      width: 380,

      top: '7px',
      right: '14px',
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: 100,
      height: 40,
      top: '17px',
      right: '24px',
      transition: { duration: 0.75, delay: 0.4, ease: [0.76, 1, 0.24, 1] },
    },
  };

  if (!token) {
    varians.open.height = 400;
  }
  if (user) {
    varians.open.height = 500;
  }
  if (token && user) {
    varians.open.height = 550;
  }

  const menu = {
    initial: {
      opacity: 0,
      rotateX: 0,
    },
    enter: (i) => ({
      opacity: 1,
      rotateX: 0,
      transition: { delay: 0.5 + i * 0.1 },
    }),
    exit: {
      opacity: 0,
      rotateX: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <div className={`${atHeader ? 'NavbarBg' : 'Navbar'}  col-12 d-flex flex-wrap align-items-center justify-content-between px-4   `}>
        <img src="assets/logo.png" alt="logo" className="img-fluid" style={{ maxHeight: '50px' }} />

        <motion.div className="buttonNavbar " onClick={() => setActive(!active)} ref={ref}>
          <motion.div
            className="buttonNavbar1 "
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            initial="closed"
            animate={active ? 'open' : 'closed'}
            variants={buttonVariants}
          >
            MENU
          </motion.div>
          <motion.div
            className="buttonNavbar2"
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            initial="closed"
            animate={active ? 'closed' : 'open'}
            variants={buttonVariants}
          >
            CLOSE
          </motion.div>
        </motion.div>
        <motion.div
          className={`${atHeader ? 'navbarMenu' : 'navbarMenuBack'} px-4     `}
          variants={varians}
          animate={active ? 'open' : 'closed'}
          initial="closed"
        >
          <AnimatePresence>
            {active && (
              <>
                {/* Gunakan Link untuk melakukan navigasi */}

                {!user && !token && (
                  <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <motion.div variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbarTitle " custom={0}>
                      ClickIt
                    </motion.div>

                    <motion.a href="/guestLogin" variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbar mt-4 col-12" custom={1}>
                      Login as Guest
                    </motion.a>
                    <motion.a href="/userLogin" variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbar mt-4 col-12" custom={2}>
                      Login as User
                    </motion.a>
                    <motion.span variants={menu} animate="enter" exit="exit" initial="initial" className="mt-5 colorNavbar" custom={3}>
                      @2024 All reserved by ClickIt.Inc
                    </motion.span>
                  </div>
                )}

                {user && !token && (
                  <div className="d-flex flex-column  my-3 ">
                    <motion.div variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbarTitle" custom={0}>
                      ClickIt
                    </motion.div>

                    <div className="d-flex flex-column align-items-center  justify-content-center mt-2">
                      <motion.div className="borderImageProfile " variants={menu} animate="enter" exit="exit" initial="initial" custom={1}>
                        <img src={`assets/${user.profileImage}`} alt="image User" className="img-fluid" />
                      </motion.div>
                      <motion.div className="namaUserNavbar my-2" variants={menu} animate="enter" exit="exit" initial="initial" custom={2}>
                        Haii , {user.userName} 👋
                      </motion.div>
                    </div>
                    <motion.a href="/userLogin" variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbar mt-2" custom={3}>
                      Login as User
                    </motion.a>
                    <motion.div
                      href="/userLogin"
                      variants={menu}
                      animate="enter"
                      exit="exit"
                      initial="initial"
                      className="menuNavbar mt-2"
                      custom={4}
                      onClick={() => dispatch(setLogout())}
                    >
                      Exit Guest Mode
                    </motion.div>
                    <motion.span variants={menu} animate="enter" exit="exit" initial="initial" className="mt-4 colorNavbar" custom={5}>
                      @2024 All reserved by ClickIt.Inc
                    </motion.span>
                  </div>
                )}
                {token && (
                  <div className="d-flex flex-column  my-3 ">
                    <motion.div variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbarTitle" custom={0}>
                      ClickIt
                    </motion.div>

                    <div className="d-flex flex-column align-items-center  justify-content-center mt-2">
                      <motion.div className="borderImageProfile " variants={menu} animate="enter" exit="exit" initial="initial" custom={1}>
                        <img src={`assets/${user.profileImage}`} alt="image User" className="img-fluid" />
                      </motion.div>
                      <motion.div className="namaUserNavbar my-2" variants={menu} animate="enter" exit="exit" initial="initial" custom={2}>
                        Haii , {user.userName} 👋
                      </motion.div>
                    </div>
                    <motion.a href="/dashboard" variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbar mt-2" custom={3}>
                      Dashboard
                    </motion.a>
                    <motion.a href="/" variants={menu} animate="enter" exit="exit" initial="initial" className="menuNavbar mt-2" custom={4}>
                      Homepage
                    </motion.a>
                    <motion.div
                      href="/userLogin"
                      variants={menu}
                      animate="enter"
                      exit="exit"
                      initial="initial"
                      className="menuNavbar mt-2"
                      custom={5}
                      onClick={() => dispatch(setLogout())}
                    >
                      Logout
                    </motion.div>
                    <motion.span variants={menu} animate="enter" exit="exit" initial="initial" className="mt-4 colorNavbar" custom={6}>
                      @2024 All reserved by ClickIt.Inc
                    </motion.span>
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
});

export default Navbar;
