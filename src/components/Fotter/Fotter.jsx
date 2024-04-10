import React from 'react';
import './Fotter.css';
import { FaArrowRight } from 'react-icons/fa';

function Fotter() {
  return (
    <div className=" d-flex flex-column mt-5 Fotter">
      <div className="container paddingDepan  mt-4">
        <span className="titleFotter">ClickIt</span>
      </div>
      <div className="container col-12 d-flex flex-wrap  align-items-center justify-content-center my-5">
        <span className="col-12 col-lg-6 bigTitleFotter ">Join our community for make this website better</span>
        <div className="col-12 col-lg-6 d-flex flex-column kotakEmail ">
          <div>
            <label htmlFor="email" className="labelEmail text-start">
              Your Email Address
            </label>
            <div className="d-flex flex-wrap align-items-center">
              <input type="text" name="email" id="email" className="inputanEmail py-2" />
              <FaArrowRight className="labelEmail ms-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="kotakAboutUs container d-flex flex-wrap my-5">
        <div className="col-6 col-lg-4 d-flex flex-column">
          <span className="titleAboutUs my-4">The ClickIt Company</span>
          <span className="subAboutUs my-1">About</span>
          <span className="subAboutUs my-1">Contact</span>
          <span className="subAboutUs my-1">Term & Condition</span>
          <span className="subAboutUs my-1">Privacy Policy</span>
        </div>
        <div className="col-6 col-lg-4 d-flex flex-column">
          <span className="titleAboutUs my-4">Social Media</span>
          <span className="subAboutUs my-1">Instagram</span>
          <span className="subAboutUs my-1">LinkedIn</span>
          <span className="subAboutUs my-1">Email</span>
          <span className="subAboutUs my-1">Company Number</span>
        </div>
      </div>
      <span className="container subAboutUs paddingDepan fotterBottom  my-4">@2024 Alright Reserved by Quizzy.Inc</span>
    </div>
  );
}

export default Fotter;
