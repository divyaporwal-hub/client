import React from "react";
import MainIntroImage from "../images/mainIntroImage.png";
import "../styles/Intro.css";

const intro = ({ unplashImage }) => {
  return (
    <>
      <div className="Intro">
        <div className="imageContainer">
          <img src={unplashImage} alt="intro" />
          <div className="centerText">Let's write an amazing blog...</div>
          {/* <div className="centerText">Let's</div> */}
        </div>
      </div>
    </>
  );
};

export default intro;
