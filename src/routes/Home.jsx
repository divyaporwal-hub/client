import React, { useState } from "react";
import Tags from "../components/Tags";
import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Blogs from "../components/Blogs";
import Header from "../components/Header";
import "../styles/Home.css";
import HomeSearch from "../components/HomeSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../components/useWindowDimensions";

const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [recBlogs, setRecBlogs] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [raonSearch, setRaonSearch] = useState(false);
  const { height, width } = useWindowDimensions();

  function handleSearchOpen() {
    setShowSearch(!showSearch);
    setRaonSearch(!raonSearch);
  }

  return (
    <div className="Home">
      {/* Header will contain userprofile icons and name of the website */}
      {/* <Header /> */}
      {/* main will contain entire page information */}
      <div className="main">
        {/* Left seciton will contain the Navbar */}
        <div className="left">
          <Navbar active={"home"} />
        </div>

        {/* Right section will contain Blog + Tags */}
        <div className="right">
          <div className="informationContainer">
            <div className="introContainer">
              {/* Here may be a slider or just a image to introduce the website */}
              {/* <Intro /> */}
            </div>
            <div className="blogsContainer">
              {/* We have to map all the blogs here... */}
              <Blogs
                searchTitle={searchTitle}
                setSearchTitle={setSearchTitle}
                searchTags={searchTags}
                setSearchTags={setSearchTags}
                setRecBlogs={setRecBlogs}
                raonSearch={raonSearch}
              />
            </div>
          </div>

          <div className="showHideSearch">
            {showSearch || width >= 481 ? (
              <div className="tagContainer">
                <HomeSearch />
                <Tags recBlogs={recBlogs} />
                {width < 481 && (
                  <div className="searchCloseIcon" onClick={handleSearchOpen}>
                    <FontAwesomeIcon icon={faX} />
                  </div>
                )}
              </div>
            ) : (
              <div className="searchIconContainer" onClick={handleSearchOpen}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
