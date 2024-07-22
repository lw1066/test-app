"use client";

import Image from "next/image";
import classes from "./Library.module.css";
import cover2a from "../../../public/images/cover2a.webp";

const WelcomeMessage = () => {
  return (
    <>
      <div className={classes.welcomeImageContainer}>
        <Image
          src={cover2a}
          alt="Smiling students sitting in a classroom"
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          priority={true}
        />
      </div>
    </>
  );
};

export default WelcomeMessage;
