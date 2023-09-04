import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper/ref";
import moment from "moment";
import { NavLink } from "react-router-dom";

import "../../styles/DisplayComment.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faRemove,
  faTrashAlt,
  faTrashCan,
  faTrashCanArrowUp,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";

function DisplayComment({ comment, setCommentCount }) {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  //get request to display the fullname of user who did the comment
  const localData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = localData ? localData.userId : "-1";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/userInfoById`, {
        params: {
          userId: comment.postId,
        },
      })
      .then((response) => {
        setFullName(response.data[0].fullName);
        setUserName(response.data[0].userName);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //delete the comment

  function handleDelete() {
    axios
      .delete(`${BASE_URL}/comment/deleteComment`, {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setIsDeleted(true);
        setCommentCount((prev) => {
          return prev - 1;
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      className="DisplayComment"
      style={isDeleted ? { display: "none" } : { display: "flex" }}
    >
      <div className="container">
        <div className="infoContainer">
          <p className="fullName">
            <NavLink to={`/profile/${userName}`}>{fullName}</NavLink>
          </p>
          <p className="timerEmoji"> • </p>
          <p className="postedTime">{moment(comment.postedDate).fromNow()}</p>
        </div>
        {userId !== "-1" &&
          comment.postId ===
            JSON.parse(localStorage.getItem("userInfo")).userId && (
            <div className="deleteButtonContainer">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="fa-2x icon-hover"
                onClick={handleDelete}
              />
            </div>
          )}
      </div>
      <p className="comment">{comment.commentText}</p>
    </div>
  );
}

export default DisplayComment;
