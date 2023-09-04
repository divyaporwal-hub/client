import React from "react";
import parse from "html-react-parser";

const BlogContent = ({ blogText }) => {
  let filteredText = "";
  if (blogText) {
    filteredText = parse(blogText + "<p><br/></p>").filter((data) => {
      return data.props.children.type !== "br";
    });
  }

  return (
    <>
      <div className="blogContent">{blogText && filteredText}</div>
    </>
  );
};

export default BlogContent;
