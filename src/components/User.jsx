import React from "react";
import AvatarImage from "../images/userAvatar.png";
import Avatar from "react-avatar";
import { NavLink } from "react-router-dom";

import "../styles/User.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const User = (props) => {
  let localData = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="profileContainer">
      {props.userSocialLinks && props.userSocialLinks[2] ? (
        <Avatar
          githubHandle={props.userSocialLinks[2].slice(
            props.userSocialLinks[2].lastIndexOf("/") + 1
          )}
          size={150}
          round="100px"
        />
      ) : (
        <Avatar name={props.fullName} size={150} round="100px" />
      )}

      <h2 className="fullname">{props.fullName}</h2>
      <p className="username">@{props.userName}</p>
      <p className="bio">{props.userBio}</p>
      <div className="secondaryInfo">
        <p className="location">
          {props.location ? props.location.label : "India"}
        </p>
        <p>・</p>
        <p className="postCount">{props.postCount} posts</p>
        <p>・</p>
        <p className="followers">{props.followers} followers</p>
      </div>
      {props.userSocialLinks && (
        <div className="socialMedia">
          {props.userSocialLinks[0] && (
            <Link to={props.userSocialLinks[0]} target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          )}
          {props.userSocialLinks[1] && (
            <Link to={props.userSocialLinks[1]} target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          )}
          {props.userSocialLinks[2] && (
            <Link to={props.userSocialLinks[2]} target="_blank">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          )}
        </div>
      )}
      <NavLink
        to={`/profile/edit/${props.userName}`}
        className="editButtonLink"
      >
        {localData && localData.userName === props.userName && (
          <button>edit</button>
        )}
      </NavLink>
    </div>
  );
};

export default User;
