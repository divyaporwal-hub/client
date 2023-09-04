import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import ConfirmForget from "./ConfirmForget.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../helper/kalamlogo2.png";

const ForgetPass = () => {
  const [userEmail, setUserEmail] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [userOTP, setUserOTP] = useState("");
  const [dbOtp, setDbOtp] = useState("");

  //confirm opassword ko call call krne ke liye
  const [callconfirmpass, setCallconfirmpass] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    // API call
    e.preventDefault();
    Axios.get(`${BASE_URL}/forget/checkUser`, {
      params: {
        userEmail: userEmail,
      },
    })
      //email/password verification
      .then((response) => {
        if (response.data.length) {
          Axios.post(`${BASE_URL}/forget/generate`, {
            userEmail: userEmail,
          }).then((otpResp) => {
            setDbOtp(otpResp.data);
            setOtpSend(true);
          });
        } else {
          alert("Email is not registered.");
        }
      })
      .catch((err) => {
        alert("We're sorry, something went wrong");
        console.log(err);
      });
  }

  async function handleOtpSubmit(e) {
    // ab eske baad shikha ma'am krengi...
    e.preventDefault();
    if (dbOtp == userOTP) {
      setCallconfirmpass(true);
    } else {
      alert("OTP is not matched...");
    }
  }

  return (
    <>
      <div className="formContainer">
        {callconfirmpass ? (
          <ConfirmForget userEmail={userEmail} />
        ) : otpSend ? (
          <form className="form" onSubmit={handleOtpSubmit}>
            <h1 className="formHeading"> Enter OTP ✍</h1>
            <input
              type="text"
              placeholder="OTP"
              value={userOTP}
              onChange={(e) => setUserOTP(e.target.value)}
            />
            <button type="submit"> Verify </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="formHeading">Forgot Password</h1>
            <div className="formGroup" style={{ flexDirection: "column" }}>
              <p style={{ margin: "10px 0", fontSize: "1.2rem" }}>
                Please enter the registred email <br />
                address and we'll send you an OTP <br />
                to reset your password.
              </p>
            </div>
            <div className="formGroup">
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <button type="submit"> Send OTP </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ForgetPass;
