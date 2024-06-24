"use client";

import { useRef } from "react";

import classes from "./Library.module.css";
import Link from "next/link";
import NewsAccordion from "./NewsAccordion";

const WelcomeMessage = () => {
  const catalogueRef = useRef(null);

  const handleScrollToCatalogue = () => {
    catalogueRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.welcomeMessage}>
      <h1 style={{ fontSize: 24, textAlign: "center", marginTop: 20 }}>
        Welcome!
      </h1>
      <p style={{ textAlign: "center", paddingInline: 10, fontSize: ".75rem" }}>
        Browse our catalogue, catch up on the latest below or go to{" "}
        <Link href="/Faq" className={classes.linkstyle}>
          FAQs
        </Link>{" "}
        to learn more about us
      </p>
    </div>
  );
};

export default WelcomeMessage;
