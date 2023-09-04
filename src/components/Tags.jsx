import React from "react";
import Tag from "./Tag";

import "../styles/Tags.css";
import { BASE_URL } from "../helper/ref";

const Tags = ({ recBlogs }) => {
  // for(let i=0; i<recBlogs.length; i++) {
  //   let likes = axios.get(`${BASE_URL}/like/getLikes`, {
  //     params: {
  //       blogId: recBlogs[i]._id
  //     }
  //   })
  // }

  return (
    <div className="Tags">
      <h1> Latest Blogs</h1>
      <div className="allTags">
        {/* <Tag tagName="javaScript" />
        <Tag tagName="python" />
        <Tag tagName="react" />
        <Tag tagName="mongodb" /> */}
        {recBlogs &&
          recBlogs.slice(0, 5).map((key) => {
            return (
              <Tag tagName={key.blogHeading} key={key._id} blogId={key._id} />
            );
          })}
      </div>
    </div>
  );
};

export default Tags;
