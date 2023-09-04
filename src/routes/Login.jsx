import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);

  function handleShowhide(e) {
    e.preventDefault();
    setshowPassword(!showPassword);
  }

  function handleSubmit(e) {
    // API call
    e.preventDefault();

    Axios.post(`${BASE_URL}/user/login`, {
      userEmail: userEmail,
      userPassword: userPassword,
    })
      //email/password verification
      .then((response) => {
        if (response.data.length) {
          // save information in localstorage before moving to home page
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              userEmail: userEmail,
              userName: response.data[0].userName,
              fullName: response.data[0].fullName,
              userId: response.data[0]._id,
            })
          );

          // navigating to home page
          navigate("/");
        } else {
          alert("Email/Password is incorrect");
        }
      })
      .catch((err) => {
        alert("We're sorry, something went wrong");
        console.log(err);
      });
  }

  return (
    <>
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <h1 className="formHeading">Login 🔐</h1>
          </div>
          <div className="formGroup">
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <div onClick={handleShowhide} className="passwordShowHide">
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>
          <div className="formGroup">
            <Link to={"/forgetPass"}>Forgot Password?</Link>
            <button type="submit"> Login </button>
          </div>
          <div className="formGroup">
            <div className="lineSeperator"></div>
          </div>
          <div className="formGroup">
            <p>Not Have Account?</p>
            <Link to={"/register"} className="registerLink">
              Register
            </Link>
          </div>
          {/* <Link to={"/register"}>
            <button>Register</button>
          </Link> */}
        </form>
      </div>
    </>
  );
};

export default Login;
