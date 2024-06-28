"use client";

import { useRef } from "react";

import classes from "./Library.module.css";
import Link from "next/link";
import { useDarkMode } from "@/context/DarkModeContext";

const WelcomeMessage = () => {
  const { darkMode } = useDarkMode();
  return (
    <>
      <div className={classes.welcomeContainer}>
        <div className={classes.welcomeContent}>
          <h1
            style={{
              fontSize: 24,
              textAlign: "center",

              fontWeight: 800,
            }}
          >
            Welcome to Perceptia!
          </h1>
        </div>
      </div>
      <p
        style={{
          textAlign: "center",
          paddingInline: 10,
          fontSize: ".75rem",
          fontWeight: 500,
        }}
      >
        Welcome text 名古屋市 here blah blah blah Browse our catalogue, catch up
        on the latest below or go to{" "}
        <Link href="/Faq" className={classes.linkstyle}>
          FAQs
        </Link>{" "}
        to learn more about us
      </p>
    </>
  );
};

export default WelcomeMessage;
