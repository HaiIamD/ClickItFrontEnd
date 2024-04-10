import { useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './page/Homepage/Homepage';
import GuestLoginPage from './page/GuestLogin/GuestLoginPage';
import Userlogin from './page/UserLogin/Userlogin';
import Registerpage from './page/RegisterPage/Registerpage';
import Dashboardpolling from './page/DashboardPolling/Dashboardpolling';
import Dashboarduser from './page/DashboardUser/Dashboarduser';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const mode = useSelector((state) => state.mode);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="app" data-theme={mode}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Dashboardpolling /> : <Navigate to={'/homepage'} />} />
            <Route path="/dashboard" element={token ? <Dashboarduser /> : <Navigate to={'/userLogin'} />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/guestLogin" element={<GuestLoginPage />} />
            <Route path="/userLogin" element={<Userlogin />} />
            <Route path="/register" element={<Registerpage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
