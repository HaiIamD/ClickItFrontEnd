import React, { useEffect, useState } from 'react';
import './Createpollings.css';
import { IoMdClose, IoMdImages } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setPolls } from '../../state/redux';
import { slide } from '../../page/DashboardUser/animation';
import { motion } from 'framer-motion';

function Createpollings({ swipeCreate, updateData }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dataPolls = useSelector((state) => state.dataPolls);

  const [pollsImage, setPollsImage] = useState('');
  const [pollsImagePreview, setPollsImagePreview] = useState(false);
  const [titlePolls, setTitlePolls] = useState('');
  const [pollingInput, setPollingInput] = useState('');

  const [verification, setVerification] = useState(false);

  const [confDelete, setConfDelete] = useState(false);

  const [options, setOptions] = useState([]);

  // Make Pollings
  const createPolls = async () => {
    setVerification(true);
    const inputanCreate = new FormData();
    inputanCreate.append('titlePolls', titlePolls);
    options.forEach((option, index) => {
      inputanCreate.append(`options[${index}]`, option);
    });
    inputanCreate.append('pollsImage', pollsImage);

    try {
      const fetchData = await fetch(`${import.meta.env.VITE_CREATE_POLLS}/${user._id}`, {
        method: 'POST',
        headers: { Authorization: `clickIt ${token}` },
        body: inputanCreate,
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        toast.success('Succesfully create new pollings 🔥');
        setVerification(false);
        updateData(data);
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

  // Make status polls to done
  const doneStatus = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_STATUS_POLLS}/${dataPolls._id}`, {
        method: 'PATCH',
        headers: { Authorization: `clickIt ${token}` },
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        toast.success(data);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

  // Delete Polls
  const deletePolls = async () => {
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_DONE_POLLS}/${dataPolls._id}`, {
        method: 'DELETE',
        headers: { Authorization: `clickIt ${token}` },
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        toast.success(data);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        const data = await fetchData.json();
        toast.success(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

  // Image Configuration upload
  const changeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPollsImagePreview(URL.createObjectURL(e.target.files[0]));
      setPollsImage(e.target.files[0]);
    }
    e.target.value = '';
  };

  //  Make push from Pollingsinputan to options
  const makeArray = () => {
    if (options.length < 3) {
      setOptions((prevOptions) => [...prevOptions, pollingInput]);
    } else {
      toast.error('Sorry , Max Pollings just 3');
    }
    setPollingInput('');
  };

  useEffect(() => {
    if (dataPolls !== null) {
      setPollsImagePreview(dataPolls.pollsImage), setTitlePolls(dataPolls.titlePolls);
      const optionsArray = dataPolls.polls.map((poll) => poll.option);
      // Mengatur nilai state 'options' dengan array yang berisi semua nilai 'option'
      setOptions(optionsArray);
    }
  }, []);

  return (
    <>
      <div className=" d-flex justify-content-end my-4 px-5 ">
        <span
          onClick={() => {
            swipeCreate();
            setTimeout(() => {
              dispatch(setPolls({ dataPolls: null }));
            }, 1000);
          }}
          className="closeButton"
        >
          <IoMdClose className="iconExit" /> Close Create Page
        </span>
      </div>

      <motion.div variants={slide} initial="initial" animate="enter" exit="exit" className="d-flex flex-wrap justify-content-center">
        <div className="leftSide col-11 col-sm-10  col-xl-5 ">
          <div className="backgroundCreate d-flex flex-column  px-4 py-3">
            <span className="userName">ClickIt</span>
            <span className="textCreate py-2">Let's Begin Crafting Your Own Personalized Polling Experience Right Away!</span>
          </div>
          <div className=" backgroundCreate d-flex flex-wrap justify-content-between align-items-center  mt-3 px-4 py-3">
            <div className="d-flex flex-column">
              <span className="userName">Authors : </span>
              <span className="textCreate">{user.userName}</span>
            </div>
            <div className="besarImageProfile">
              <img src={`assets/${user.profileImage}`} alt="imageUser" className="img-fluid " />
            </div>
          </div>
        </div>
        <div className="col-11 col-sm-10 col-xl-6 d-flex flex-column justify-content-center align-items-center">
          <div className="kotakImageCreate col-12 col-lg-11 rounded-3 d-flex justify-content-center align-items-center">
            <label htmlFor="image" className="labelImage d-flex flex-column justify-content-center align-items-center">
              {pollsImagePreview ? <img src={pollsImagePreview} alt="image" className="img-fluid col-12" /> : <IoMdImages className="iconImage" />}
              {dataPolls === null && <span>Click To Add Image</span>}
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="inputanImage"
              accept=".jpg, .jpeg, .png"
              required
              onChange={changeImage}
              disabled={dataPolls !== null}
            />
          </div>
          <div className="d-flex flex-column my-3 col-12 col-lg-11">
            <label htmlFor="title" className="labelInputCreate">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="inputCreate py-1"
              required
              value={titlePolls}
              onChange={(e) => setTitlePolls(e.target.value)}
              readOnly={dataPolls !== null}
            />
          </div>
          <div className="d-flex flex-column my-3 col-12 col-lg-11">
            <label htmlFor="Pollings" className="labelInputCreate">
              Pollings
            </label>
            <input
              type="text"
              id="Pollings"
              className="inputCreate py-1"
              value={pollingInput}
              onChange={(e) => setPollingInput(e.target.value)}
              readOnly={dataPolls !== null}
            />
            <div className="d-flex justify-content-end my-2">
              {dataPolls === null && (
                <span className=" labelAdd  px-3 py-1 rounded-3" onClick={makeArray}>
                  Add +
                </span>
              )}
              {dataPolls !== null && <span className=" labelAdd  px-3 py-1 rounded-3">Add +</span>}
            </div>
          </div>
          <div className="kotakIsiPollings col-12 col-lg-11 p-3 d-flex flex-column">
            {options.length > 0 &&
              options.map((data, i) => (
                <div className="isiPolls my-2 col-12  p-3 rounded-3" key={i}>
                  {data}
                </div>
              ))}
            {options.length === 0 && <span className="labelInputCreate text-center my-4 ">You don't have any pollings yet !</span>}
          </div>
          {dataPolls === null && (
            <div className="col-12 col-lg-11 submitNewPolls my-5 mt-4 p-3 text-center rounded-3" onClick={() => createPolls()}>
              {!verification ? 'Create Pollings' : 'Loading...'}
            </div>
          )}
          {dataPolls !== null && (
            <div className="d-flex flex-wrap col-12 justify-content-center">
              {dataPolls.status === 'onGoing' && (
                <>
                  {!confDelete && (
                    <div className="col-11 mx-2 bg-success submitNewPolls my-5 mt-4 p-3 text-center rounded-3" onClick={() => setConfDelete(true)}>
                      Finished
                    </div>
                  )}
                  {confDelete && (
                    <>
                      <div className={`col-5 mx-2 submitNewPolls bg-success my-5 mt-4 p-3 text-center rounded-3`} onClick={() => doneStatus()}>
                        Finished
                      </div>
                      <div className={`col-5 mx-2 submitNewPolls  my-5 mt-4 p-3 text-center rounded-3`} onClick={() => setConfDelete(false)}>
                        Cancel
                      </div>
                    </>
                  )}
                </>
              )}
              {dataPolls.status === 'done' && (
                <>
                  {!confDelete && (
                    <div className={`col-11 mx-2 submitNewPolls bg-danger my-5 mt-4 p-3 text-center rounded-3`} onClick={() => setConfDelete(true)}>
                      Delete Pollings
                    </div>
                  )}
                  {confDelete && (
                    <>
                      <div className={`col-5 mx-2 submitNewPolls bg-danger my-5 mt-4 p-3 text-center rounded-3`} onClick={() => deletePolls()}>
                        Delete
                      </div>
                      <div className={`col-5 mx-2 submitNewPolls  my-5 mt-4 p-3 text-center rounded-3`} onClick={() => setConfDelete(false)}>
                        Cancel
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Createpollings;
