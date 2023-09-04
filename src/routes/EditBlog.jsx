import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EditorConvertToHTML from "../components/EditorConvertToHTML";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "../styles/Write.css";
import { BASE_URL } from "../helper/ref";
import TagSuggestion from "../components/TagSuggestion";

const EditBlog = () => {
  const { blogId } = useParams();

  const [heading, setHeading] = useState("");
  const [blogText, setBlogText] = useState("");
  const [blogTags, setBlogTags] = useState([]);
  const navigate = useNavigate();

  // get the data of the blog by blogId to fill the input fields
  useEffect(() => {
    async function fetchBlogInfo() {
      let response = await Axios.get(`${BASE_URL}/blog/getBlogInfo`, {
        params: {
          id: blogId,
        },
      });

      if (response.data.length) {
        setHeading(response.data[0].blogHeading);
        setBlogText(response.data[0].blogText);
        setBlogTags(response.data[0].blogTags);
      }
    }

    fetchBlogInfo();
  }, []);

  const localDataObject = JSON.parse(localStorage.getItem("userInfo"));
  const userId = localDataObject.userId;
  function updateContent() {
    Axios.put(`${BASE_URL}/blog/updateBlog`, {
      blogHeading: heading,
      blogText: blogText,
      blogId: blogId,
      blogTags: blogTags,
      saveDate: moment(new Date()).format("ll"),
    })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
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
              {blogText && (
                <EditorConvertToHTML
                  blogText={blogText}
                  setBlogText={setBlogText}
                  updateCall={true}
                />
              )}
            </div>
          </div>
          <div className="btn-cnt">
            <button className="btn publish-btn" onClick={updateContent}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditBlog;

{
  /* <div className="right">
          <div>
            <textarea
              className="blogHeading"
              placeholder="New post title here..."
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            ></textarea>
          </div>
          <div className="editorContainer">
            <EditorConvertToHTML
              blogText={blogText}
              setBlogText={setBlogText}
              updateCall={true}
            />
          </div>
          <div className="btn-cnt">
            <button className="btn" onClick={updateContent}>
              Update
            </button>
          </div>
        </div> */
}
