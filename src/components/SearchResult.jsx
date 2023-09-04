import React, { useEffect, useState } from "react";
import Tags from "../components/Tags";
import Navbar from "../components/Navbar";
import Blogs from "../components/Blogs";
import "../styles/Home.css";
import HomeSearch from "../components/HomeSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../components/useWindowDimensions";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [recBlogs, setRecBlogs] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [raonSearch, setRaonSearch] = useState(false);
  const { height, width } = useWindowDimensions();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchOpen() {
    setShowSearch(!showSearch);
    setRaonSearch(!raonSearch);
  }

  useEffect(() => {
    setSearchTitle(searchParams.get("title"));
    setSearchTags(searchParams.get("tags"));
  }, []);

  return (
    <div className="Home">
      <div className="main">
        <div className="left">
          <Navbar active={"home"} />
        </div>

        <div className="right">
          <div className="informationContainer">
            <div className="introContainer"></div>
            <div className="blogsContainer">
              <Blogs
                searchTitle={searchTitle}
                searchTags={searchTags}
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
export default SearchResult;
