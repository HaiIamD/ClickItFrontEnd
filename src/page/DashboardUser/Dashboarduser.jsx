import React, { useEffect, useState } from 'react';
import './Dashboarduser.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Fotter/Fotter';
import Createpollings from '../../components/CreatePolling/Createpollings';
import { AnimatePresence, motion } from 'framer-motion';
import { menuSlide } from './animation';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setPolls } from '../../state/redux';
import { Curve } from './CurveSVG';
import ScaleLoader from 'react-spinners/ScaleLoader';

function Dashboarduser() {
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [activePolls, setActivePolls] = useState([]);
  const [donePolls, setDonePolls] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [limit, setLimit] = useState(8);
  const [limitDone, setLimitDone] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  console.log('Active : ', activePolls);
  console.log('Inactive : ', donePolls);

  const getPollsById = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GET_ALL_POLLS_DONE}/${user._id}?limit=${limit}`, {
        method: 'GET',
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        setActivePolls(data);
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

  const getDonePollsById = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_GET_ALL_POLLS_DONE}/done/${user._id}?limit=${limitDone}`, {
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

  const swipeCreate = () => {
    setPopUp(false);
  };

  useEffect(() => {
    getPollsById();
    getDonePollsById();
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  }, [limit, limitDone]);

  // Lopping Image
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

  const updateData = (newData) => {
    setActivePolls([newData, ...activePolls]);
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {popUp && (
          <div className=" kotakPopUp vh-100 col-12 d-flex justify-content-end  ">
            <div className="col-1 col-md-3 " onClick={() => setPopUp(false)}></div>

            <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className="col-11 col-md-9 ">
              <Curve />
              <div className="Popup">
                <Createpollings swipeCreate={swipeCreate} updateData={updateData} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Navbar />
      <ToastContainer position="top-right" draggable theme={`${mode}`} />

      <div className="container  Dashboard d-flex flex-column">
        <div className="container">
          <span className="greetingText">Haii, {user.userName} 👋</span>
          <div className="d-flex flex-wrap justify-content-between align-items-center mt-2">
            <span className="titleUserGreeting ">Create polls, gather insights, spark discussions, and drive change with enthusiasm</span>
            <button className="createPollings px-2 py-3 rounded-3" onClick={() => setPopUp(true)}>
              Create New Pollings +
            </button>
          </div>
        </div>
        <hr className="hr" />
        {isLoading && (
          <>
            <div className="container  d-flex flex-column my-3">
              <div className="kotakAcitivePolls d-flex flex-wrap  my-3">
                <span className="col-12 col-lg-6 col-xl-4 tagActive py-2 px-5 rounded-3 ">Active ClickIt Polls</span>
                <span className="textSubActivePolls">Active pollings imply that you can participate in polls because they are still open for voting.</span>
              </div>
              {activePolls.length !== 0 && (
                <div className="d-flex flex-wrap">
                  {activePolls.map((data, i) => (
                    <div className=" col-12 col-sm-6 col-lg-4 col-xl-3  p-2 my-2 " key={i}>
                      <div
                        className="cardPollings px-2 py-3"
                        style={{ backgroundImage: `url(${data.pollsImage})` }}
                        onClick={() => {
                          dispatch(setPolls({ dataPolls: data })), setPopUp(true);
                        }}
                      >
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
                        {data.titlePolls.split(' ').slice(0, 14).join(' ')} {data.titlePolls.split(' ').length > 14 ? ' ...' : ''}
                      </p>
                    </div>
                  ))}
                  <div className="col-12 d-flex  justify-content-end">
                    <span className="loadMore px-3 py-2" onClick={() => setLimit(limit + 8)}>
                      Load More
                    </span>
                  </div>
                </div>
              )}
              {activePolls.length === 0 && <div className="text-center my-5 py-5">You dont have any Active pollings yet ...</div>}
            </div>
            <div className="container  d-flex flex-column my-3">
              <hr className="hr" />
              <div className="kotakAcitivePolls d-flex flex-wrap  my-3">
                <span className="col-12 col-lg-5 col-xl-4 tagActive py-2 px-5 rounded-3 ">Inactive ClickIt Polls</span>
                <span className="textSubActivePolls">Inactive pollings indicate that participation is no longer available as the voting period has ended.</span>
              </div>
              {donePolls.length !== 0 && (
                <div className="d-flex flex-wrap">
                  {donePolls.map((data, i) => (
                    <div
                      className="col-12 col-sm-6 col-lg-4 col-xl-3  p-2 my-2 "
                      key={i}
                      onClick={() => {
                        dispatch(setPolls({ dataPolls: data })), setPopUp(true);
                      }}
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
                    <span className="loadMore px-3 py-2" onClick={() => setLimitDone(limitDone + 8)}>
                      Load More
                    </span>
                  </div>
                </div>
              )}
              {donePolls.length === 0 && <div className="text-center my-5 py-5">You dont have any Inactive pollings yet ...</div>}
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
      </div>

      <Footer />
    </>
  );
}

export default Dashboarduser;
