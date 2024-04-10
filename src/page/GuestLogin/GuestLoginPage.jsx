import React, { useEffect, useState } from 'react';
import './GuestLoginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGuest } from '../../state/redux';

function GuestLoginPage() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const guestAuthentication = async (e) => {
    e.preventDefault();

    try {
      const fetchData = await fetch(`${import.meta.env.VITE_LOGIN_GUEST}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: username,
          profileImage,
        }),
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        dispatch(
          setGuest({
            user: data.guest,
          })
        );
        navigate('/');
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

  // Membuat Number Acak untuk profileImage
  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 10) + 1; // Menghasilkan angka random dari 1 hingga 5
    const videoRandom = `${random}.png`;
    setProfileImage(videoRandom);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);
  return (
    <>
      <ToastContainer position="top-right" draggable theme={`${mode}`} />
      <div className="loginPage ">
        <div className="col-11 col-sm-9 col-lg-12 d-flex flex-wrap justify-content-center kotakLogin ">
          <div className="col-6  col-lg-5 ">
            <div className="borderImage d-flex flex-wrap align-content-center justify-content-center">
              <img src="assets/loginimage.jpg" alt="loginImage" className="img-fluid" />
            </div>
          </div>
          <div className="col-12 col-lg-7 d-flex flex-column justify-content-center align-items-center">
            <div className="col-11 col-lg-7 col-xxl-7  d-flex flex-column ">
              <h1 className="titleLogin  ">ClickIt</h1>
              <h1 className="titleLogin mb-5 ">Guest Mode</h1>
              <form onSubmit={guestAuthentication} className="d-flex flex-column mb-1 ">
                <label className="labelInput mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Type username here ..."
                  className="inputLogin py-3 px-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="textLogin mt-2">
                  Already Have Account ? <Link to={'/userLogin'}>Login as user here</Link>
                </span>

                <div className="d-flex flex-wrap textLogin my-4">
                  <button type="submit" className="col-12  buttonLogin text-center rounded-3">
                    Start ClickIt
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuestLoginPage;
