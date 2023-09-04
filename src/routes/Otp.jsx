import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";

function Otp() {
  function handleSubmit(e) {
    e.preventDefault();
    let userEmail = localStorage.getItem("userEmailForOtp");
    Axios.post(`${BASE_URL}/user/userInfo`, {
      userEmail: userEmail,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
    <>
      <form className="otp">
        <input type="text" placeholder="enter your OTP" />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {/* s */}
      </form>
    </>
  );
}


export default Otp;
