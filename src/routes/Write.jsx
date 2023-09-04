import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditorConvertToHTML from "../components/EditorConvertToHTML";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../styles/Write.css";
import { BASE_URL } from "../helper/ref";
import TagSuggestion from "../components/TagSuggestion";

const Write = () => {
  const [heading, setHeading] = useState("");
  const [blogText, setBlogText] = useState("");
  const [blogTags, setBlogTags] = useState([]);
  const navigate = useNavigate();

  const localDataObject = JSON.parse(localStorage.getItem("userInfo"));
  const userId = localDataObject.userId;
  function saveContent() {
    if (heading) {
      Axios.post(`${BASE_URL}/blog/saveBlog`, {
        blogHeading: heading,
        blogTags: blogTags,
        blogText: blogText,
        userId: userId,
        saveDate: moment(new Date()).format("ll"),
      })
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please Add the title of the blog");
    }
  }

  return (
    <>
      {/* <Header /> */}
      <Navbar active={"write"} />
      <div className="Write">
        <div className="right">
          <div className="rightEditorContainer">
            <div className="blogHeadingContainer">
              <textarea
                className="blogHeading"
                placeholder="New post title here..."
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              ></textarea>
            </div>
            <div className="tagAreaContainer">
              <TagSuggestion blogTags={blogTags} setBlogTags={setBlogTags} />
            </div>
            <div className="editorContainer">
              <EditorConvertToHTML
                blogText={blogText}
                setBlogText={setBlogText}
                updateCall={false}
              />
            </div>
          </div>
          <div className="btn-cnt">
            <button className="btn publish-btn" onClick={saveContent}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Write;
