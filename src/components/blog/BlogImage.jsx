import React from "react";
import BlogPoster from "../../images/blog1.jpg";

const BlogImage = () => {
  return (
    <>
      <div className="BlogMainImage">
        <img src={BlogPoster} alt="blogposter" />
      </div>
    </>
  );
};

export default BlogImage;
