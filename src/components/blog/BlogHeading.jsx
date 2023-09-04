import React from "react";
import "../../styles/BlogHeading.css";

const BlogHeading = ({blogHeading}) => {
  return (
    <>
      <h1 className="BlogHeading">
        {blogHeading}
      </h1>
    </>
  );
};

export default BlogHeading;
