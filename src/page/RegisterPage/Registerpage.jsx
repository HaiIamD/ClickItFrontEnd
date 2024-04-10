import React, { useEffect, useState } from 'react';
import './Registerpage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function Registerpage() {
  const navigate = useNavigate();

  const mode = useSelector((state) => state.mode);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_REGISTER_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: username,
          email: email,
          password: password,
          profileImage: profileImage,
        }),
      });

      if (fetchData.ok) {
        const data = await fetchData.json();
        toast(`✨ ${data}`, { autoClose: 2000 });
        setTimeout(() => {
          navigate('/userLogin');
        }, 5000);
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
      <div className="registerPage d-flex  justify-content-center align-content-center">
        <div className="col-1 col-sm-4 col-lg-6 "></div>
        <div className="col-11 col-sm-8 col-lg-6  rightRegister">
          <div className="col-8 col-xxl-7  d-flex flex-column ">
            <h1 className="titleLogin  ">ClickIt</h1>
            <h1 className="titleLogin mb-5 ">Register Side</h1>
            <form onSubmit={registerUser} className="d-flex flex-column ">
              <label htmlFor="username" className="labelInput my-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Type username here ..."
                className="inputLogin py-3 px-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email" className="labelInput my-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your_email@gmail.com"
                className="inputLogin py-3 px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="labelInput my-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                className="inputLogin py-3 px-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="textLogin mt-2">
                Already have account ? <Link to={'/userLogin'}>Login Here</Link>
              </span>
              <div className="d-flex flex-wrap textLogin my-2">
                <button type="submit" className="col-12  buttonLogin text-center rounded-3">
                  Register ClickIt
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registerpage;
