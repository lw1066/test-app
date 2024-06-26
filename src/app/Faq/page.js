"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import Image from "next/legacy/image";
import FAQAccordion from "../components/FAQAccordion";
import classes from "../components/Library.module.css";
import Link from "next/link";

const Page = () => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div className="d-flex flex-column  align-items-center justify-content-center mt-5">
        <Image
          src={darkMode ? "/images/faqWhite.png" : "/images/faqBlack.png"}
          alt="people talking animation"
          width={80}
          height={80}
          unoptimized
        />

        <h1 style={{ fontSize: "18px", display: "flex", flexDirection: "row" }}>
          Still got questions -&nbsp;
          <Link className={classes.linkstyle} href="Contact">
            Contact us!
          </Link>
        </h1>
      </div>
      <FAQAccordion />
    </>
  );
};

export default Page;
