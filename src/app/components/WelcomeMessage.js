"use client";

import classes from "./Library.module.css";

const WelcomeMessage = () => {
  return (
    <>
      <div className={classes.welcomeImageContainer}>
        <img
          src="/images/cover_image2.jpg"
          alt="Students"
          className={classes.welcomeImage}
        />
        <div className={classes.welcomeImageText}>
          <div className={classes.line1}>Dedicated to providing the finest</div>
          <div className={classes.line2}>teaching and learning materials</div>
        </div>
      </div>
    </>
  );
};

export default WelcomeMessage;
