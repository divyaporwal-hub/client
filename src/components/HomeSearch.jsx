import React, { useState } from "react";
import "../styles/HomeSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useNavigate } from "react-router-dom";

function HomeSearch() {
  const [search, setSearch] = useState("");
  const [tagSearch, setTagsearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate({
      pathname: "/search",
      search: `?title=${search}&tags=${tagSearch}`,
    });
  }

  return (
    <div className="HomeSearch">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="blogtitle">Search By Title</label>
          <input
            type="search"
            name=""
            id=""
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="blogtag">Search By Tags</label>
          <input
            type="search"
            name=""
            id=""
            onChange={(e) => setTagsearch(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <button>
            Search <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default HomeSearch;
