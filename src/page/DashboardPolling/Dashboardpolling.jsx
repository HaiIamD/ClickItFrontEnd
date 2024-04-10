import React, { useEffect, useState } from 'react';
import './Dashboardpolling.css';
import Navbar from '../../components/navbar/Navbar';
import { FaArrowRight } from 'react-icons/fa';
import Fotter from '../../components/Fotter/Fotter';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { setPolls } from '../../state/redux';
import { AnimatePresence } from 'framer-motion';
import { popUp, latterAnimated } from './animation';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Livepolling from '../../components/Livepolling/Livepolling';
import ScaleLoader from 'react-spinners/ScaleLoader';

function Dashboardpolling() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const [onGoingPolls, setOnGoingPolls] = useState([]);
  const [threePolls, setThreePolls] = useState([]);
  const [donePolls, setDonePolls] = useState([]);
  const [limitData, setLimitData] = useState(11);
  const [limitDataDone, setLimitDataDone] = useState(8);
  const [showPollings, setShowPollings] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  console.log(threePolls);
  console.log(onGoingPolls);

  const getPollings = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GET_ALL_POLLS}?limit=${limitData}`, {
        method: 'GET',
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        setThreePolls(data.slice(0, 3));
        setOnGoingPolls(data.slice(3));
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

  const getPollingsDone = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GET_ALL_POLLS}/done?limit=${limitDataDone}`, {
        method: 'GET',
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        setDonePolls(data);
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

  useEffect(() => {
    getPollings();
    getPollingsDone();
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, [limitData, limitDataDone]);

  const makeOneArray = (polls) => {
    let images = [];

    // Loop through each poll
    polls.forEach((poll) => {
      // Check if votes exist
      if (poll.votes) {
        // Loop through each vote in the poll
        poll.votes.forEach((vote) => {
          // Push the image user into the images array
          if (vote.imageUser) {
            images.push(vote.imageUser);
          }
        });
      }
    });

    // Return the array of images
    return images;
  };

  return (
    <>
      <AnimatePresence mode="wait">{!showPollings && <Livepolling setShowPollings={setShowPollings} />}</AnimatePresence>
      <ToastContainer position="top-right" draggable theme={`${mode}`} />
      <Navbar />,
      {isLoading && (
        <>
          <motion.div
            variants={popUp}
            initial="initial"
            animate="animate"
            className="container-md Dashboard d-flex flex-column justify-content-center  align-items-center"
          >
            <motion.span variants={latterAnimated} className="titleDashboard text-center col-12 col-lg-8">
              Join the Discussion, Analyze, and Collaborate to Participate in the Existing Polls Together!
            </motion.span>
            {/* Baggian 3 Image di awal */}
            <Swiper
              className="col-12 borderImageSlider"
              modules={[Pagination, A11y, Autoplay]}
              spaceBetween={50}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              slidesPerView={1}
            >
              {threePolls?.map((data, i) => (
                <SwiperSlide className="col-12 d-flex imageSlider " style={{ backgroundImage: `url(${data.pollsImage})` }} key={i}>
                  <div className="col-12 col-lg-7 col-xl-9"></div>
                  <div className="col-12 col-lg-5 col-xl-3 rightSidePollinsgBanner d-flex  px-4 rounded-4">
                    <div>
                      <span className="titlePollings  my-2">
                        {data.titlePolls.split(' ').slice(0, 14).join(' ')} {data.titlePolls.split(' ').length > 14 ? ' ...' : ''}
                      </span>
                      <div className="d-flex flex-wrap align-items-center my-4 col-12 ">
                        {makeOneArray(data.polls)
                          .slice(0, 3)
                          .map((image, index) => (
                            <div className="borderImages" key={index}>
                              <img src={`assets/${image}`} alt="profileImage" className="img-fluid" />
                            </div>
                          ))}
                        {makeOneArray(data.polls).length - 3 > 0 ? (
                          <span className="allAudience p-1 px-2 ms-2 rounded-4"> +{makeOneArray(data.polls).length - 3} Audience</span>
                        ) : (
                          <span className="allAudience p-1 px-2 ms-2 rounded-2"> Let's Join Pollings </span>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="authors">Authors : </span>
                      <span className="titlePollings">{data.creator[0].userName} </span>
                      <span className="authors">Created at 28 Maret 2024 </span>
                    </div>
                    <div
                      className="d-flex flex-wrap align-items-center justify-content-center mt-3"
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                      onClick={() => (setShowPollings(false), dispatch(setPolls({ dataPolls: data })))}
                    >
                      <span className="titleJoin">Join Room</span>
                      <FaArrowRight className="labelArrow ms-3" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <div className="container  d-flex flex-column my-4">
            <hr />
            <div className="kotakAcitivePolls d-flex flex-wrap  my-3">
              <span className="col-12 col-lg-5 col-xl-4 tagActive py-2 px-5 rounded-3 ">Active ClickIt Polls</span>
              <span className="textSubActivePolls">Active pollings imply that you can participate in polls because they are still open for voting.</span>
            </div>

            {/* Bagian Active Pollings */}
            <div className="d-flex flex-wrap">
              {onGoingPolls.map((data, i) => (
                <div
                  className="col-12 col-sm-6 col-lg-4 col-xl-3  p-2 my-2 "
                  key={i}
                  onClick={() => (setShowPollings(false), dispatch(setPolls({ dataPolls: data })))}
                >
                  <div className="cardPollings px-2 py-3" style={{ backgroundImage: `url(${data.pollsImage})` }}>
                    <span className="audienceCard  py-2 rounded-3 d-flex flex-wrap">
                      <div className="d-flex align-items-center ">
                        {makeOneArray(data.polls)
                          .slice(0, 3)
                          .map((image, index) => (
                            <div className="borderImages" key={index}>
                              <img src={`assets/${image}`} alt="profileImage" className="img-fluid" />
                            </div>
                          ))}

                        <div className="py-2  ">
                          {makeOneArray(data.polls).length - 3 > 0 ? (
                            <span className="allAudience p-1 px-2  ms-2 rounded-4"> +{makeOneArray(data.polls).length - 3} Respondent</span>
                          ) : makeOneArray(data.polls).length === 0 ? (
                            <span className=" p-1  ms-2 rounded-1"> No Respondent yet</span>
                          ) : (
                            <span className="allAudience p-1 px-3  ms-2 rounded-4">Respondent </span>
                          )}
                        </div>
                      </div>
                    </span>
                  </div>
                  <p className="titlePollingsCard">
                    {' '}
                    {data.titlePolls.split(' ').slice(0, 14).join(' ')} {data.titlePolls.split(' ').length > 14 ? ' ...' : ''}
                  </p>
                </div>
              ))}
              <div className="col-12 d-flex  justify-content-end">
                <span className="loadMore px-3 py-2" onClick={() => setLimitData(limitData + 8)}>
                  Load More
                </span>
              </div>
            </div>
          </div>

          <div className="container  d-flex flex-column my-4">
            <hr />
            <div className="kotakAcitivePolls d-flex flex-wrap  my-3">
              <span className="col-12 col-lg-5 col-xl-4 tagActive py-2 px-5 rounded-3 ">Inactive ClickIt Polls</span>
              <span className="textSubActivePolls">Inactive pollings indicate that participation is no longer available as the voting period has ended.</span>
            </div>

            {/* Bagian Inactive Polls */}
            <div className="d-flex flex-wrap">
              {donePolls.map((data, i) => (
                <div
                  className="col-12 col-sm-6 col-lg-4 col-xl-3  p-2 my-2 "
                  key={i}
                  onClick={() => (setShowPollings(false), dispatch(setPolls({ dataPolls: data })))}
                >
                  <div className="cardPollings px-2 py-3" style={{ backgroundImage: `url(${data.pollsImage})` }}>
                    <span className="audienceCard  py-2 rounded-3 d-flex flex-wrap">
                      <div className="d-flex align-items-center ">
                        {makeOneArray(data.polls)
                          .slice(0, 3)
                          .map((image, index) => (
                            <div className="borderImages" key={index}>
                              <img src={`assets/${image}`} alt="profileImage" className="img-fluid" />
                            </div>
                          ))}

                        <div className="py-2  ">
                          {makeOneArray(data.polls).length - 3 > 0 ? (
                            <span className="allAudience p-1 px-2  ms-2 rounded-4"> +{makeOneArray(data.polls).length - 3} Respondent</span>
                          ) : makeOneArray(data.polls).length === 0 ? (
                            <span className=" p-1  ms-2 rounded-1"> No Respondent yet</span>
                          ) : (
                            <span className="allAudience p-1 px-3  ms-2 rounded-4">Respondent </span>
                          )}
                        </div>
                      </div>
                    </span>
                  </div>
                  <p className="titlePollingsCard">
                    {' '}
                    {data.titlePolls.split(' ').slice(0, 14).join(' ')} {data.titlePolls.split(' ').length > 14 ? ' ...' : ''}
                  </p>
                </div>
              ))}
              <div className="col-12 d-flex  justify-content-end">
                <span className="loadMore px-3 py-2" onClick={() => setLimitDataDone(limitDataDone + 8)}>
                  Load More
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <div className="d-flex flex-wrap justify-content-center align-items-center min-vh-100">
            <ScaleLoader color="#000" />
          </div>
        </>
      )}
      <Fotter />
    </>
  );
}

export default Dashboardpolling;
