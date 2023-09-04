import React from "react";
import "../styles/Tag.css";
import { NavLink } from "react-router-dom";
const Tag = (props) => {
  return (
    <NavLink to={`/bloginfo/${props.blogId}`} className={"tagNav"}>
      <div className="Tag">{props.tagName}</div>
    </NavLink>
  );
};

export default Tag;
