import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import { BASE_URL } from "../helper/ref.js";
import Axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import isUrl from "is-url";
import ReactLoading from "react-loading";
import countryOptions from "../helper/countryOptions";

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
  // const [profileImage, setProfileImage] = useState("");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState("linkedin");
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Getting Your Profile");


  const options = useMemo(() => countryOptions,[]);
  

  // Now, options contains an array of all country names.

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

    Axios.post(`${BASE_URL}/profileImage/profileImageUpload`, data)
      .then((response) => {})
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
    setLoading(true);
    setLoadingMessage("Updating Your Profile");
    if (allLinkAreValid()) {
      if (regex.test(newUserName)) {
        let response = await Axios.get(`${BASE_URL}/user/userInfo`, {
          params: {
            userName: newUserName,
          },
        });

        if (response.data.length === 0 || userData.userName === newUserName) {
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
              // update the username and ufullname from localstorage
              let userInfo = JSON.parse(localStorage.getItem("userInfo"));
              userInfo.userName = newUserName;
              userInfo.fullName = fullName;
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              setLoading(false);
              navigate("/profile/" + newUserName);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        } else {
          alert("This username is already exist");
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userData.userName]);

  return (
    <>
      {/* <Header /> */}
      {/* <Navbar /> */}
      <div className="EditProfile">
        {loading ? (
          <div
            className="loaderContainer"
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ReactLoading
              type={"spin"}
              color={"#45aaff"}
              height={50}
              width={50}
            />
            <div style={{ marginTop: "10px" }}>
              Please wait, {loadingMessage}...
            </div>
          </div>
        ) : (
          <>
            <h1 className="formNameHeading">Edit Profile</h1>
            <form onSubmit={handleSubmit}>
              <div className="formGroup">
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  id="userName"
                  placeholder="User Name"
                  value={newUserName}
                  onChange={(e) => setNewuserName(e.target.value)}
                  autoComplete="on"
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
                <label htmlFor="userBio">Your Bio</label>
                <textarea
                  id="userBio"
                  placeholder="write about yourself"
                  value={userBio}
                  onChange={(e) => setUserBio(e.target.value)}
                  rows={5}
                ></textarea>
              </div>
              <div className="formGroup">
                <label htmlFor="react-select-2-input">Country</label>
                <Select
                  options={options}
                  value={country}
                  onChange={changeHandler}
                  id="countryName"
                />
              </div>

              <div className="formGroup" id="SocialMediaContainer">
                <div className="socialMediaIcons">
                  {/* Linked Label */}
                  <label
                    htmlFor="socialMedialProfileInput"
                    className="iconLabel"
                    onClick={() => {
                      setSelectedSocialMedia("linkedin");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="fa-2x icon-hover"
                      style={
                        selectedSocialMedia === "linkedin" && {
                          color: "#474747",
                        }
                      }
                    />
                  </label>

                  {/* Instagram Label */}
                  <label
                    htmlFor="socialMedialProfileInput"
                    className="iconLabel"
                    onClick={() => {
                      setSelectedSocialMedia("instagram");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="fa-2x icon-hover"
                      style={
                        selectedSocialMedia === "instagram" && {
                          color: "#474747",
                        }
                      }
                    />
                  </label>

                  {/* Github Label */}
                  <label
                    htmlFor="socialMedialProfileInput"
                    className="iconLabel"
                    onClick={() => {
                      setSelectedSocialMedia("github");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="fa-2x icon-hover"
                      style={
                        selectedSocialMedia === "github" && {
                          color: "#474747",
                        }
                      }
                    />
                  </label>
                </div>

                <input
                  type="text"
                  id={"socialMedialProfileInput"}
                  placeholder={`add ${selectedSocialMedia} profile`}
                  value={
                    selectedSocialMedia === "linkedin"
                      ? linkedin === null
                        ? ""
                        : linkedin
                      : selectedSocialMedia === "instagram"
                      ? instagram === null
                        ? ""
                        : instagram
                      : selectedSocialMedia === "github"
                      ? github === null
                        ? ""
                        : github
                      : ""
                  }
                  onChange={(e) => {
                    selectedSocialMedia === "linkedin"
                      ? setLinkedin(e.target.value)
                      : selectedSocialMedia === "instagram"
                      ? setInstagram(e.target.value)
                      : setGithub(e.target.value);
                  }}
                  autoComplete="off"
                />
              </div>
              <div className="formGroup">
                <label htmlFor="submit"></label>
                <button type="submit" id="submit">
                  Update
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
export default Editprofile;
