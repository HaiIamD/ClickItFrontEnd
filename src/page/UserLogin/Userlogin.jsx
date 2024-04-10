import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../state/redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Userlogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAuthentication = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await fetch(`${import.meta.env.VITE_LOGIN_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (fetchData.ok) {
        const data = await fetchData.json();
        dispatch(
          setLogin({
            user: data.user,
            token: data.token,
          })
        );
        navigate('/dashboard');
      } else {
        const data = await fetchData.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Something Wrong, Try Again Latter ...');
    }
  };

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
              <h1 className="titleLogin mb-5 ">User Mode</h1>
              <form onSubmit={loginAuthentication} className="d-flex flex-column ">
                <label htmlFor="email" className="labelInput mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your_email@gmail.com"
                  className="inputLogin py-3 px-2"
                  required
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="textLogin mt-2">
                  Don't have account ? <Link to={'/register'}>Register Here</Link>
                </div>
                <div className="d-flex flex-wrap textLogin my-2">
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

export default Userlogin;
