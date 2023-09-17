import React, { useState, useEffect } from "react";
import Tags from "../components/Tags";
import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Blogs from "../components/Blogs";
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../components/useWindowDimensions";
import axios from "axios";

const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [recBlogs, setRecBlogs] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [raonSearch, setRaonSearch] = useState(false);
  const { height, width } = useWindowDimensions();
  const [unplashImage, setUnplashImage] = useState("");

  function handleSearchOpen() {
    setShowSearch(!showSearch);
    setRaonSearch(!raonSearch);
  }

  useEffect(() => {
    (async () => {
      const imageResponse = await axios.get(
        "https://api.unsplash.com/search/photos?query=blog&client_id=UZPaZPnCoD0WJMmh6R-qnK3InJ2phfCnLSMaxxN9jlk&per_page=20"
      );
      setUnplashImage(imageResponse.data.results[0].urls.full);
    })();
  }, [unplashImage]);

  return (
    <div className="Home">
      {/* Header will contain userprofile icons and name of the website */}
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
              {/* {unplashImage && <Intro unplashImage={unplashImage} />} */}
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
                {/* <HomeSearch /> */}
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
