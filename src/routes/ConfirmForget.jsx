import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import {passwordStrength}from  'check-password-strength';

const ConfirmForget = ({ userEmail }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword]=useState(false);
  const [showCnfpassword, setShowCnfpassword]=useState(false);
  const navigate = useNavigate();
  function handlepassword(e){
    e.preventDefault();
    setShowPassword(!showPassword);
   }
   function handleCnfpassword(e){
    e.preventDefault();
    setShowCnfpassword(!showCnfpassword);
   }

  function handleSubmit(e) {
    e.preventDefault();
   if(userPassword === confirmPassword) {
    Axios.put(`${BASE_URL}/forget/updatepassword`, {
      userEmail: userEmail,
      updatedPassword: userPassword,
    })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
   } else {
    alert("Password not matched.");
   }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="formHeading">Update password 🔑</h1>
        <div>
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
       <button  onClick={handlepassword}>{showPassword? "hide":"show"}</button>
        </div>
        <div>
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button  onClick={handleCnfpassword}>{showCnfpassword? "hide":"show"}</button>
        </div>
        
        <button type="submit"> Update </button>
      </form>
    </>
  );
};

export default ConfirmForget;
