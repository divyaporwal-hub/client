import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import axios from "axios";
import { BASE_URL } from "../helper/ref";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "./useWindowDimensions";
import Avatar from "react-avatar";

const Header = () => {
  const { height, width } = useWindowDimensions();
  let localData = JSON.parse(localStorage.getItem("userInfo"));
  const [searchText, setSearchText] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [profileData, setProfileData] = useState({});

  function handleSearch(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    axios
      .get(`${BASE_URL}/blog/getsearchblogs`, {
        params: {
          searchTitle: e.target.value,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAllBlogs(response.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openBlog() {
    setSearchText("");
  }

  function handleSearchBoxOpen() {
    setShowSearchBox(!showSearchBox);
  }

  useEffect(() => {
    setShowSearchBox(width > 481);
  }, [width]);

  useEffect(() => {
    async function getGitHub() {
      console.log(localData.userName);
      let profileResult = await axios.get(`${BASE_URL}/profile/getProfile`, {
        params: {
          userName: localData.userName,
        },
      });
      try {
        if (profileResult.data.length) {
          setProfileData(profileResult.data[0]);
        }
      } catch (err) {
        console.log("Error: Profile can't be feched due to", err);
      }
    }

    getGitHub();
  }, []);

  return (
    <div className="main__header">
      <div className="header">
        <div className="leftSection">
          <Link to={"/"}>
            <h1 className="logoName">Kalam</h1>
          </Link>
          <div
            className="searchContainer"
            style={showSearchBox ? { display: "inline" } : { display: "none" }}
          >
            <input
              type="search"
              name=""
              id=""
              value={searchText}
              placeholder="Search..."
              onChange={handleSearch}
            />
          </div>

          {searchText && (
            <div className="allSearchResults">
              {searchText && (
                <div className="searchResultContainer">
                  {allBlogs &&
                    allBlogs.map((blog, index) => {
                      return (
                        <NavLink
                          to={`/bloginfo/${blog._id}`}
                          onClick={() => openBlog(blog._id)}
                        >
                          <div className="searchResult" key={index}>
                            {blog.blogHeading}
                          </div>
                        </NavLink>
                      );
                    })}
                </div>
              )}
            </div>
          )}
          {/* </form> */}
        </div>
        <div className="rightSection">
          <div className="searchIcon">
            {width < 481 && (
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: "1.5rem" }}
                onClick={handleSearchBoxOpen}
              />
            )}
          </div>
          <NavLink to={localData ? `/write` : "/login"} className={"writeLink"}>
            <FontAwesomeIcon icon={faPenAlt} style={{ fontSize: "1.5rem" }} />
          </NavLink>
          <NavLink to={localData ? `/profile/${localData.userName}` : "/login"}>
            {profileData &&
            profileData.userSocialLinks &&
            profileData.userSocialLinks[2] ? (
              <Avatar
                githubHandle={profileData.userSocialLinks[2].slice(
                  profileData.userSocialLinks[2].lastIndexOf("/") + 1
                )}
                size={45}
                round="50px"
              />
            ) : (
              <Avatar name={profileData.fullName} size={45} round="50px" />
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
