"use client";

import classes from "./Library.module.css";

const WelcomeMessage = () => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          src="/images/cover_image2.jpg"
          alt="Students"
          className={classes.welcomeImage}
        />
        <div className={classes.welcomeImageText}>
          Dedicated to providing the finest
          <br /> teaching and learning materials
        </div>
      </div>
    </>
  );
};

export default WelcomeMessage;
