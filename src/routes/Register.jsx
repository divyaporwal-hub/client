import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper/ref.js";
import "../styles/Login.css";
import { passwordStrength } from "check-password-strength";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showCnfpassword, setShowCnfpassword] = useState(false);
  const navigate = useNavigate();
  function handlepassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  function handelCnfpassword(e) {
    e.preventDefault();
    setShowCnfpassword(!showCnfpassword);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    // checking for password strength

    if (validPass && password === confirmPassword) {
      let regex = /^[a-zA-Z0-9]+$/;

      if (regex.test(userName)) {
        let response = await Axios.get(`${BASE_URL}/user/userInfo`, {
          params: {
            userName,
          },
        });

        if (response.data.length === 0) {
          Axios.post(`${BASE_URL}/user/saveUser`, {
            userEmail: userEmail,
            userName: userName,
            fullName: fullName,
            userPassword: password,
          })
            .then((response) => {
              console.log(response.data);
              navigate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("This username is already exist");
        }
      } else {
        alert(
          "Invalid Username\nUsername must contain only alphabet and digits."
        );
      }
    } else if (!validPass) {
      setWarningMsg("password should be strong.");
    } else if (password !== confirmPassword) {
      setWarningMsg("confirm password is not matched");
    }
  }

  return (
    <>
      <div className="formContainer">
        <form className="register" onSubmit={handleSubmit}>
          <div className="formGroup">
            <h1 className="formHeading">Register 📃</h1>
          </div>
          <div className="formGroup">
            <input
              id="fullName"
              type="text"
              placeholder="FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <input
              id="userName"
              type="text"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <input
              id="userEmail"
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setValidPass(
                  passwordStrength(e.target.value).value === "Medium" ||
                    passwordStrength(e.target.value).value === "Strong"
                );
              }}
              style={
                password
                  ? validPass
                    ? {
                        backgroundColor: "#81d581",
                      }
                    : {
                        backgroundColor: "#ffa2a2",
                      }
                  : {
                      backgroundColor: "#e2e2e2",
                    }
              }
            />
            <div onClick={handlepassword} className="passwordShowHide">
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>

          <div className="formGroup">
            <input
              id="cpassword"
              type={showCnfpassword ? "text" : "password"}
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div onClick={handelCnfpassword} className="passwordShowHide">
              {showCnfpassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>

          <div className="formGroup">
            <p className="warningMsg">{warningMsg}</p>
          </div>
          <div className="formGroup">
            <p>Make your account</p>
            <button type="submit">Sign Up</button>
          </div>
          <div className="formGroup">
            <div className="lineSeperator"></div>
          </div>
          <div className="formGroup">
            <p>Already have an account?</p>
            <Link to={"/login"} className="registerLink">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
