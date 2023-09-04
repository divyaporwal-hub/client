import React from "react";
import MainIntroImage from "../images/mainIntroImage.png";
import "../styles/Intro.css";

const intro = () => {
  return (
    <>
      <div className="Intro">
        <div className="imageContainer">
          <img src={MainIntroImage} alt="intro" />
        </div>
      </div>
    </>
  );
};

export default intro;
