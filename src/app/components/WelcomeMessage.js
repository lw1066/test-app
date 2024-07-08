"use client";

import classes from "./Library.module.css";

const WelcomeMessage = () => {
  return (
    <>
      <div className={classes.welcomeImageContainer}>
        <img
          src="/images/coverF.jpg"
          alt="Students"
          className={classes.welcomeImage}
        />
      </div>
    </>
  );
};

export default WelcomeMessage;
