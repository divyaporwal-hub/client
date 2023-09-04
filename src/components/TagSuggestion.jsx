import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const TagSuggestion = ({ blogTags, setBlogTags }) => {
  return (
    <div>
      <TagsInput
        value={blogTags}
        onChange={setBlogTags}
        name="coding"
        placeHolder="Enter blog's Tags..."
      />
    </div>
  );
};

export default TagSuggestion;
