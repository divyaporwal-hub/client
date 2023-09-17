import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../helper/ref";
import "../styles/Blog.css";
import { convert } from "html-to-text";

const Blog = ({
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
  const [unplashImage, setUnplashImage] = useState("");

  let blogContentPreview = "";
  blogContentPreview = convert(blogPreview);
  blogContentPreview = blogContentPreview.split(" ").slice(0, 17).join(" ");

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

  // useEffect(() => {
  //   (async () => {
  //     const imageResponse = await axios.get(
  //       "https://api.unsplash.com/search/photos?query=blog&client_id=UZPaZPnCoD0WJMmh6R-qnK3InJ2phfCnLSMaxxN9jlk&per_page=20"
  //     );
  //     setUnplashImage(
  //       imageResponse.data.results[Math.floor(Math.random() * 20)].urls.full
  //     );
  //   })();
  // }, [unplashImage]);

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
                  #{tag}
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
      {/* <NavLink to={`/bloginfo/${blogId}`} className={"imageLink"}>
        <div className="blogImage">
          <div className="headingContainer">
            {heading[0].length > 30
              ? heading[0].slice(0, 30) + "..."
              : heading[0]}
          </div>
          <img src={unplashImage && unplashImage} alt="" />
        </div>
      </NavLink> */}
    </div>
  );
};

export default Blog;
