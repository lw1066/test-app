"use client";

import { useRef } from "react";

import classes from "./Library.module.css";
import Link from "next/link";
import { useDarkMode } from "@/context/DarkModeContext";

const WelcomeMessage = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className={classes.welcomeContainer}>
      <div className={classes.welcomeContent}>
        <h1
          style={{
            fontSize: 24,
            textAlign: "center",
            marginTop: 20,
            fontWeight: 800,
          }}
        >
          Welcome!
        </h1>
        <p
          style={{
            textAlign: "center",
            paddingInline: 10,
            fontSize: ".75rem",
            fontWeight: 500,
          }}
        >
          Browse our catalogue, catch up on the latest below or go to{" "}
          <Link href="/Faq" className={classes.linkstyle}>
            FAQs
          </Link>{" "}
          to learn more about us
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
