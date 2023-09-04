import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helper/ref";
import "../styles/BlogInfo.css";

import BlogUser from "../components/blog/BlogUser";
import BlogContent from "../components/blog/BlogContent";
import BlogFooter from "../components/blog/BlogFooter";
import BlogImage from "../components/blog/BlogImage";
import BlogHeading from "../components/blog/BlogHeading";
import BlogInfoUser from "../components/blog/BlogInfoUser";
import ReactLoading from "react-loading";
import Header from "../components/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComments,
  faShare,
  faCommentAlt,
  faMailBulk,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const BlogInfo = () => {
  const { id } = useParams();

  const [searchBgId, setSearchBgId] = useState("");
  //const [emptysearch, setEmptysearch] = useState(false);
  const [blogData, setBlogData] = useState({});
  const [userName, setUserName] = useState("");
  const [blogId, setBlogId] = useState("");
  const [userIdForFollowers, setUserIdForFollowers] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setLoading(true);
    setSearchBgId(id);
    //setEmptysearch(true);

    axios
      .get(`${BASE_URL}/blog/getBlogInfo`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setBlogData(response.data[0]);
        setBlogId(response.data[0]._id);
        let userId = response.data[0].userId;
        // to get the username by userId
        // why? because the username may be change during the profile edit
        axios
          .get(`${BASE_URL}/user/userInfoById`, {
            params: {
              userId: userId,
            },
          })
          .then((userResponse) => {
            setUserName(userResponse.data[0].userName);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
        // end userInfo request
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="BlogInfoContainer">
          <div className="loaderContainer">
            <ReactLoading
              type={"spin"}
              color={"#45aaff"}
              height={50}
              width={50}
            />
            <div>Fetching the blog...</div>
          </div>
        </div>
      ) : (
        <div className="BlogInfoContainer">
          <div className="left">
            <div className="blogDetailContainer">
              <BlogUser
                userName={userName}
                userIdForFollowers={userIdForFollowers}
                blogSaveTime={blogData.blogSaveTime}
                minuteRead={blogData.minuteRead}
                blogId={blogId}
                setUserIdForFollowers={setUserIdForFollowers}
              />
              <BlogHeading blogHeading={blogData.blogHeading} />
              <BlogContent blogText={blogData.blogText} />
              {blogData.blogTags ? (
                <div className="blogTagsContainer">
                  {blogData.blogTags.map((tag, index) => {
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
              {blogId && <BlogFooter id={blogId} />}
            </div>
          </div>
          <div className="right">
            {userName && userIdForFollowers && (
              <BlogInfoUser
                userName={userName}
                userIdForFollowers={userIdForFollowers}
              />
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        style={{
          position: "fixed",
          height: "50px",
          width: "50px",
          padding: "5px",
          fontSize: "1.5rem",
          bottom: "40px",
          right: "40px",
          borderRadius: "50%",
          backgroundColor: "#3993df9e",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default BlogInfo;
