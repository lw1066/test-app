"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/legacy/image";
import FAQAccordion from "../components/FAQAccordion";

const Page = () => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div className="d-flex flex-column  align-items-center justify-content-center mt-5">
        <Image
          src={darkMode ? "/images/darkAbout.webp" : "/images/lightAbout.webp"}
          alt="people talking animation"
          width={45} // Adjust the width as needed
          height={45} // Adjust the height as needed
          unoptimized
        />
        <h1 style={{ fontSize: "24px" }}>FAQs</h1>
      </div>
      <FAQAccordion />
    </>
  );
};

export default Page;
