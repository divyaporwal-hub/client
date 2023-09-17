import React from "react";
import Blog from "./Blog";
import { BASE_URL } from "../helper/ref";
import axios from "axios";
import BlogImage from "../images/blog1.jpg";
import ReactLoading from "react-loading";
import { useState, useEffect, useRef } from "react";

import "../styles/Blogs.css";
import NoBlogs from "./NoBlogs";

const INITIAL_BLOGS_TO_LOAD = 3; // Initial number of blogs to load
const BLOGS_TO_LOAD_MORE = 3; // Number of blogs to load on each "load more" click

const Blogs = ({ searchTitle, searchTags, setRecBlogs, raonSearch }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayedBlogs, setDisplayedBlogs] = useState(INITIAL_BLOGS_TO_LOAD);
  const loadingRef = useRef(null);

  useEffect(() => {
    // make your API call here...
    setLoading(true);
    if (searchTitle.length > 0 && searchTags.length > 0) {
      axios
        .get(`${BASE_URL}/blog/getsearch_TT_blog`, {
          params: {
            searchTitle,
            searchTags,
          },
        })
        .then((response) => {
          setAllBlogs(response.data.reverse());
          setLoading(false);
        })
        .catch((err) => {
          setFetchError(true);
          setLoading(false);
        });
    } else if (searchTitle.length > 0) {
      axios
        .get(`${BASE_URL}/blog/getsearchblogs`, {
          params: {
            searchTitle,
          },
        })
        .then((response) => {
          setAllBlogs(response.data.reverse());
          setLoading(false);
        })
        .catch((err) => {
          setFetchError(true);
          setLoading(false);
        });
    } else if (searchTags.length > 0) {
      axios
        .get(`${BASE_URL}/blog/getsearchtagsblog`, {
          params: {
            searchTags,
          },
        })
        .then((response) => {
          setAllBlogs(response.data.reverse());
          setLoading(false);
        })
        .catch((err) => {
          setFetchError(true);
          setLoading(false);
        });
    } else {
      axios
        .get(`${BASE_URL}/blog/getblogs`)
        .then((response) => {
          setAllBlogs(response.data.reverse());
          setRecBlogs(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setFetchError(true);
          setLoading(false);
        });
    }
  }, [searchTitle, searchTags]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreBlogs();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [displayedBlogs]);

  const loadMoreBlogs = () => {
    setDisplayedBlogs(
      (prevDisplayedBlogs) => prevDisplayedBlogs + BLOGS_TO_LOAD_MORE
    );
  };

  return (
    <div className={raonSearch ? "Blogs searchBlogs" : "Blogs"}>
      <h1 className="mainHeading"> Recent Articles </h1>
      {loading ? (
        <div className="loaderContainer" ref={loadingRef}>
          <ReactLoading
            type={"spin"}
            color={"#45aaff"}
            height={50}
            width={50}
          />
          <div className="loadingText">Getting the blogs...</div>
        </div>
      ) : (
        <div className="allBlogs">
          {fetchError ? (
            <div>Please wait, Trying to fetch the blogs...</div>
          ) : (
            // Display blogs up to the displayedBlogs count
            allBlogs.slice(0, displayedBlogs).map((value, index) => (
              <div key={index} className="allBlogInfoContainer">
                {/* <div className="blogLine"></div> */}
                <Blog
                  heading={value.blogHeading}
                  blogTags={value.blogTags}
                  uploadTime={value.blogSaveTime}
                  userId={value.userId}
                  minuteRead={value.minuteRead}
                  blogPreview={value.blogText}
                  blogId={value._id}
                />
              </div>
            ))
          )}
          {/* Show NoBlogs component if there are no blogs */}
          {allBlogs.length === 0 && <NoBlogs />}
        </div>
      )}
    </div>
  );
};

export default Blogs;
