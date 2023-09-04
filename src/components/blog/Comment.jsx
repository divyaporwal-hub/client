import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../helper/ref.js";
import axios from "axios";
import DisplayComment from "./DisplayComment.jsx";
import "../../styles/Comment.css";
import { useNavigate } from "react-router-dom";

function Comment({ blogId, allComments, setCommentCount }) {
  const [comment, setComment] = useState("");
  let localData = JSON.parse(localStorage.getItem("userInfo"));
  let userId = localData ? localData.userId : "-1";

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (userId === "-1") {
      let userConfirm = window.confirm("Please login to comment");
      if (userConfirm) {
        navigate("/login");
      }
    }

    // Post request to save comment in DB
    else if (comment.length) {
      axios
        .post(`${BASE_URL}/comment/saveComment`, {
          comment: comment,
          userId: userId,
          blogId: blogId,
        })
        .then((res) => {
          setComment("");
          //append new comment
          allComments.push(res.data);
          setCommentCount(allComments.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //get request to fetch all the comments
  }

  return (
    <>
      <div className="commentInput">
        <form onSubmit={handleSubmit}>
          <div className="top">
            <textarea
              placeholder="Write your comment..."
              name=""
              id=""
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="bottom">
            <div className="commentBy">
              Comment by:
              <strong>
                {userId !== "-1" ? (
                  <span style={{ color: "black" }}> {localData.fullName}</span>
                ) : (
                  <span style={{ color: "red" }}>login to comment</span>
                )}
              </strong>
            </div>
            <button
              type="submit"
              disabled={comment.length ? false : true}
              style={
                comment.length
                  ? { backgroundColor: "#379bec" }
                  : { backgroundColor: "grey" }
              }
            >
              comment
            </button>
          </div>
        </form>
      </div>
      <div className="displayComment">
        {allComments.map((comment, index) => {
          return (
            <DisplayComment
              comment={comment}
              key={index}
              setCommentCount={setCommentCount}
            />
          );
        })}
      </div>
    </>
  );
}
export default Comment;
