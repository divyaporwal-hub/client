import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import isUrl from "is-url";
import { BASE_URL } from "../helper/ref";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const EditUser = () => {
  const [fullName, setFullName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [instagramURL, setInstgramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");

  const navigate = useNavigate();

  const localData = JSON.parse(localStorage.getItem("userInfo"));
  const userName = localData.userName;

  useEffect(() => {
    Axios.get(`${BASE_URL}/profile/getProfile`, {
      params: {
        userName: userName,
      },
    })
      .then((response) => {
        const user = response.data[0];
        setFullName(user.fullName);
        setNewUserName(user.userName);
        setUserBio(user.userBio);
        setFacebookURL(user.userSocialLinks[0]);
        setInstgramURL(user.userSocialLinks[1]);
        setTwitterURL(user.userSocialLinks[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default EditUser;
