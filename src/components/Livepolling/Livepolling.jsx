import React, { useEffect, useRef, useState } from 'react';
import './Livepolling.css';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { TbSend } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { menuSlide, slide } from './animation';
import { Curve } from './CurveSVG/index';
import { setPolls } from '../../state/redux';
import { useDispatch } from 'react-redux';
// Socket Io
import { io } from 'socket.io-client';
import ScaleLoader from 'react-spinners/ScaleLoader';

function Livepolling({ setShowPollings }) {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dataPolls = useSelector((state) => state.dataPolls);
  const dispatch = useDispatch();
  const [comentarAbsolute, setComentarAbsolute] = useState(false);

  const [options, setOptions] = useState([]);
  const [inputan, setInputan] = useState('');

  const [waitingImage, setWaitingImage] = useState(true);

  const [isiChat, setIsiChat] = useState([]);
  const [onlineUser, setOnlineUser] = useState(0);
  const commentAreaRef = useRef(null);

  const voteChoice = async (voteId) => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_ADD_VOTE}/${dataPolls._id}/${voteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `clickIt ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          imageUser: user.profileImage,
        }),
      });

      if (fetchData.ok) {
        const data = await fetchData.json();
        setOptions(data);
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
      console.log(error);
    }
  };

  const socket = io(`https://backendclickit.vercel.app`, {
    reconnectionAttempts: 5,
  });
  // Socket Configuration =========================
  useEffect(() => {
    // mengirim User Id
    socket.emit('addUser', user._id, dataPolls._id);
    // mendapatkan Jumlah User yang online
    socket.on('totalClient', (data) => {
      setOnlineUser(data);
    });
    // mendapatkan Pesan berdasaarkan Room
    socket.on('message', (data) => {
      setIsiChat((prevIsiChat) => [...prevIsiChat, data]);
    });
    return () => {
      socket.disconnect(); // Disconnect socket saat komponen di-unmount
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const data = {
        pollId: dataPolls._id,
        userId: user._id,
        userName: user.userName,
        message: inputan,
      };
      socket.emit('message', data);
      setInputan(' ');
    }
  };

  const disconnectChat = () => {
    socket.emit('disconnectRequest', dataPolls._id);
    setShowPollings(true);
  };
  // Socket configuraiton =========================

  useEffect(() => {
    if (dataPolls !== null) {
      const optionsArray = dataPolls.polls.map((poll) => poll);
      // Mengatur nilai state 'options' dengan array yang berisi semua nilai 'option'
      setOptions(optionsArray);
    }
  }, []);

  useEffect(() => {
    // Setelah setiap pembaruan pada isiChat, gulir ke bawah
    if (commentAreaRef.current) {
      commentAreaRef.current.scrollTop = commentAreaRef.current.scrollHeight;
    }
  }, [isiChat]);

  // Check user laredy vote or not yet
  const hasUserVoted = options.some((data) => data.votes?.some((vote) => vote.userId === user._id));

  // Check panjang votes untuk persentase
  // Menghitung total panjang votes dari semua data
  const totalVotesLength = options.reduce((total, { votes }) => total + votes?.length, 0);
  console.log(totalVotesLength);

  return (
    <div className=" livePollingsSecions d-flex flex-wrap justify-content-between">
      <div className="col-1 col-lg-3 " onClick={() => setShowPollings(true)}></div>

      <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className=" col-11 col-lg-9  kotakLivePollings     ">
        <Curve />
        <div className=" col-12 d-flex justify-content-end borderExitIcon ">
          <IoMdClose
            className="exitIcon"
            onClick={() => {
              disconnectChat();
              setTimeout(() => {
                dispatch(setPolls({ dataPolls: null }));
              }, 1000);
            }}
          />
        </div>

        <motion.div variants={slide} initial="initial" animate="enter" exit="exit" className="col-12 col-lg-4 me-2  d-flex flex-wrap justify-content-center ">
          <div className="leftImageSide px-3">
            <div className="kotakImageCreate col-12 rounded-3">
              <img
                src={dataPolls?.pollsImage}
                alt="image"
                className={`${waitingImage ? 'img-fluid col-12 imageLivePollings' : 'd-none'}`}
                onLoad={() => setWaitingImage(true)}
              />
              {!waitingImage && (
                <div>
                  <ScaleLoader color="#ffff" />
                </div>
              )}
            </div>
            <p className="col-12 px-2 titleLive mt-2">{dataPolls?.titlePolls}</p>
            <div className="col-12 d-flex flex-column">
              {options.map((data, i) =>
                dataPolls?.status === 'done' ? (
                  <div className={`pilihan d-flex flex-wrap justify-content-between my-2 px-2 rounded-3 position-relative`} key={i}>
                    <div
                      className={` ${data.votes?.some((vote) => vote.userId === user._id) ? 'persentaseBarAcitve' : 'persentaseBar'}`}
                      style={{
                        width: `${(data.votes?.length / totalVotesLength) * 100}%`,
                      }}
                    ></div>
                    <span className="persentase">
                      {data.option} {data.votes?.some((vote) => vote.userId === user._id) ? <FaCheckCircle className="ms-2" /> : ''}
                    </span>
                    <span className="persentase"> {Math.round((data.votes?.length / totalVotesLength) * 100)} %</span>
                  </div>
                ) : hasUserVoted ? (
                  <div className={`pilihan d-flex flex-wrap justify-content-between my-2 px-2 rounded-3 position-relative`} key={i}>
                    <div
                      className={` ${data.votes?.some((vote) => vote.userId === user._id) ? 'persentaseBarAcitve' : 'persentaseBar'}`}
                      style={{
                        width: `${(data.votes?.length / totalVotesLength) * 100}%`,
                      }}
                    ></div>
                    <span className="persentase">
                      {data.option} {data.votes?.some((vote) => vote.userId === user._id) ? <FaCheckCircle className="ms-2" /> : ''}
                    </span>
                    <span className="persentase"> {Math.round((data.votes?.length / totalVotesLength) * 100)} %</span>
                  </div>
                ) : (
                  <div className={`pilihan my-2 col-12 px-2 rounded-3 `} key={i} onClick={() => voteChoice(data._id)} style={{ cursor: 'pointer' }}>
                    {data.option}
                  </div>
                )
              )}
            </div>
            <div
              className="col-12 px-2 py-3 absolute mt-4 rounded-3"
              onClick={() => {
                setComentarAbsolute(true);
              }}
            >
              Open Live Discussions
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slide}
          initial="initial"
          animate="enter"
          exit="exit"
          className={`${comentarAbsolute ? 'backAbsolute d-flex flex-wrap ' : 'makeAbsolute d-flex flex-column  '}   col-12 col-lg-6   `}
        >
          <div className="col-12  backgroundCreateLive d-flex flex-wrap justify-content-between align-items-center px-4 py-3">
            <div className="d-flex flex-column">
              <span className=" warnaTeks">Authors : </span>
              <span className=" warnaTeks authorName">{dataPolls?.creator[0].userName}</span>
            </div>
            <div className="besarImageProfile">
              <img src={`assets/${dataPolls?.creator[0].profileImage}`} alt="imageUser" className="img-fluid " />
            </div>
          </div>
          <div className="kotakChat  d-flex flex-column   my-2">
            <span className="text-center teksInside px-4">
              Welcome to Live Comment. Let's engage in meaningful conversation and create a positive atmosphere for everyone ✨
            </span>
            <span className=" teksInsideOnline mt-1 d-flex align-items-center justify-content-center">
              <HiOutlineStatusOnline size={20} color="06A902" className="me-1" /> {onlineUser} Online User
            </span>
            <hr className="warna" />
            <div className="kotakLiveComentar py-3 px-2" ref={commentAreaRef}>
              {isiChat?.map((data, i) =>
                data.userId === user._id ? (
                  <div className="col-12 d-flex flex-wrap mb-3 " key={i}>
                    <p className="col"></p>
                    <div className="d-flex flex-column">
                      <span className=" isiChatSendiri py-2 px-3  ">{data.message}</span>
                      <span className=" pengirimChat  rounded-3 text-end">{data.userName}</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-wrap   mb-3 " key={i}>
                    <div className="d-flex flex-column">
                      <span className=" isiChat py-2 px-3 ">{data.message}</span>
                      <span className=" pengirimChat  rounded-3 text-start">{data.userName}</span>
                    </div>

                    <p className="col-3"></p>
                  </div>
                )
              )}
            </div>
            <div className="kotakInput d-flex flex-wrap justify-content-center align-items-center">
              <input
                type="text"
                className="inputLiveComment   col-11"
                placeholder="Type something here ..."
                value={inputan}
                onChange={(e) => setInputan(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div>
                <TbSend size={20} className="col" />
              </div>
            </div>
          </div>
          {comentarAbsolute && (
            <div
              className="col-12 px-2 py-3 absolute mt-4 rounded-3"
              onClick={() => {
                setComentarAbsolute(false);
              }}
            >
              Close Live Discussions
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Livepolling;
