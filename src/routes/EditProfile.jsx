import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { BASE_URL } from "../helper/ref.js";
import Axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import isUrl from "is-url";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/EditProfile.css";

function Editprofile() {
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const [newUserName, setNewuserName] = useState(userData.userName);
  const [fullName, setFullName] = useState(userData.fullName);
  const [userBio, setUserBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [country, setCountry] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (country) => {
    setCountry(country);
  };

  //post request to save the profile Image

  function handleProfileImage(e) {
    e.preventDefault();

    // to send the profile image into data

    const data = new FormData();
    data.append("profileImage", e.target.files[0]);
    data.append("userName", userData.userName);
    //console.log(data.get('profileImage'));

    Axios.post(`${BASE_URL}/profileImage/profileImageUpload`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function allLinkAreValid() {
    if (linkedin && !isUrl(linkedin)) {
      alert("Invalid Linkedin Profile Link");
      return 0;
    } else if (instagram && !isUrl(instagram)) {
      alert("Invalid Instagram Profile Link");
      return 0;
    } else if (github && !isUrl(github)) {
      alert("Invalid Twitter Profile Link");
      return 0;
    } else {
      return 1;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let regex = /^[a-zA-Z0-9]+$/;
    console.log(newUserName);

    if (allLinkAreValid()) {
      console.log(newUserName);
      
      if (regex.test(newUserName)) {
        // Check if the new username is the same as the user's current username
        if (newUserName === userData.userName) {
          // Proceed with updating the profile
          Axios.put(`${BASE_URL}/profile/updateProfile`, {
            userName: userData.userName,
            newUserName: newUserName,
            fullName: fullName,
            userBio: userBio,
            userCountry: country,
            userInstagram: instagram,
            userFacebook: linkedin,
            userGithub: github,
          })
            .then((response) => {
              console.log(response);
              // Update the username and fullname in localstorage
              let userInfo = JSON.parse(localStorage.getItem("userInfo"));
              userInfo.userName = newUserName;
              userInfo.fullName = fullName;
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // Check if the new username already exists
          Axios.get(`${BASE_URL}/user/userInfo`, {
            params: {
              userName: newUserName,
            },
          })
            .then((response) => {
              console.log(response.data.length);
              if (response.data.length === 0) {
                // Proceed with updating the profile
                Axios.put(`${BASE_URL}/profile/updateProfile`, {
                  userName: userData.userName,
                  newUserName: newUserName,
                  fullName: fullName,
                  userBio: userBio,
                  userCountry: country,
                  userInstagram: instagram,
                  userFacebook: linkedin,
                  userGithub: github,
                })
                  .then((response) => {
                    console.log(response);
                    // Update the username and fullname in localstorage
                    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                    userInfo.userName = newUserName;
                    userInfo.fullName = fullName;
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    navigate("/");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                alert("This username is already taken");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        alert("Invalid Username\nUsername must contain only alphabets and digits.");
      }
    } else {
      alert("Invalid Links");
    }
  }    

  
  useEffect(() => {
    Axios.get(`${BASE_URL}/profile/getProfile`, {
      params: {
        userName: userData.userName,
      },
    })
      .then((response) => {
        if (response.data.length) {
          let user = response.data[0];
          setNewuserName(user.userName);
          setFullName(user.fullName);
          setUserBio(user.userBio);
          setCountry(user.userCountry);
          setLinkedin(user.userSocialLinks[0]);
          setInstagram(user.userSocialLinks[1]);
          setGithub(user.userSocialLinks[2]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.userName]);

  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <div className="EditProfile">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="Image">Profile</label>
            <input
              type="file"
              id="Image"
              placeholder="UserName"
              onChange={handleProfileImage}
            ></input>
          </div>
          <div className="formGroup">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="User Name"
              value={newUserName}
              onChange={(e) => setNewuserName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="fullName">Fullname</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="userBio">Bio</label>
            <textarea
              id="userBio"
              placeholder="write about yourself"
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
            ></textarea>
          </div>
          <div className="formGroup">
            <label htmlFor="countryName">Country</label>
            <Select
              options={options}
              value={country}
              onChange={changeHandler}
              id="countryName"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="linkedin">
              <FontAwesomeIcon icon={faLinkedin} className="fa-2x icon-hover" />
            </label>
            <input
              type="text"
              id="linkedin"
              placeholder="linkedin url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="Instagram">
              <FontAwesomeIcon
                icon={faInstagram}
                className="fa-2x icon-hover"
              />
            </label>
            <input
              type="text"
              id="Instagram"
              placeholder="instagram url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="Github">
              <FontAwesomeIcon icon={faGithub} className="fa-2x icon-hover" />
            </label>
            <input
              type="text"
              id="Github"
              placeholder="github url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="formGroup">
            <label htmlFor=""></label>
            <button type="submit" id="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Editprofile;
