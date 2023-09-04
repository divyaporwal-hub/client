import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../helper/ref";
import "../styles/Blog.css";
import parse from "html-react-parser";
import TagSuggestion from "./TagSuggestion";
import Avatar from "react-avatar";
import randomColor from "randomcolor";

const Blog = ({
  blogImage,
  heading,
  uploadTime,
  userId,
  minuteRead,
  blogTags,
  blogPreview,
  blogId,
}) => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  // console.log("PRS: ", parse(blogPreview.slice(0, 100)));

  let blogContentPreview = "";
  // remove the new line objects
  if (blogPreview) {
    // added "<p><br/></p>" because, if there is only one element in the blogPreview then parse will not return array, and then we can't use the .filter() method inside the function.
    let allData = parse(blogPreview + "<p><br/></p>");

    blogContentPreview = allData.filter((data) => {
      return data.props.children.type !== "br";
    });

    // concatnated the strings to make the string longer in preview
    blogContentPreview = blogContentPreview
      .map((tag) => tag.props.children)
      .join(" ");

    // slice the string upto 100 characters

    blogContentPreview = blogContentPreview.split(" ").splice(0, 15).join(" ");
  }

  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/user/userInfoById`, {
          params: {
            userId: userId,
          },
        })
        .then((response) => {
          setFullName(response.data[0].fullName);
          setUserName(response.data[0].userName);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="Blog">
      <div className="blogDetails">
        <NavLink to={`/bloginfo/${blogId}`} className={"urlRedirect"}>
          <h1>{heading}</h1>
        </NavLink>

        <div className="blogInfo">
          <NavLink to={`/profile/${userName}`} className={"userLink"}>
            <div>{fullName && fullName}</div>
          </NavLink>
          <NavLink to={`/bloginfo/${blogId}`} className={"userLink"}>
            <div className="minRead">
              {minuteRead} ・ {uploadTime}
            </div>
          </NavLink>
        </div>
        {blogTags ? (
          <div className="blogTagsContainer">
            {blogTags.map((tag, index) => {
              return (
                <div className="blogTag" key={index}>
                  {tag}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        <NavLink to={`/bloginfo/${blogId}`} className={"userLink"}>
          <div className="blogPreview">
            {blogContentPreview && blogContentPreview}
          </div>
        </NavLink>
        <Link className="readMoreLink" to={`/bloginfo/${blogId}`}>
          Read More
        </Link>
      </div>
      <NavLink to={`/bloginfo/${blogId}`} className={"imageLink"}>
        <div className="blogImage">
          <div className="headingContainer">
            {heading[0].length > 30
              ? heading[0].slice(0, 30) + "..."
              : heading[0]}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Blog;
