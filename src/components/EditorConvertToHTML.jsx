import React, { useState } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; //Snow theme

const EditorConvertToHTML = ({ updateCall, blogText, setBlogText }) => {
  const placeholder = "Write your blog here...";
  const { quill, quillRef } = useQuill({ placeholder });

  // new state to check whether it is called for update or normal write
  const [updating, setUpdating] = useState(true);

  React.useEffect(() => {
    if (quill) {

      // stop preventing the paste of html when we write after coping the blogText....
      if(updateCall && updating) {
        quill.clipboard.dangerouslyPasteHTML(blogText);
        setUpdating(false); // to prevent the paste
      }

      // normal code to save the HTML
      quill.on("text-change", (delta, oldDelta, source) => {
        setBlogText(quill.root.innerHTML);
      });
    }
  }, [quill, setBlogText, blogText, updating]);

  return (
    <div style={{ width: 870, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};

export default EditorConvertToHTML;
