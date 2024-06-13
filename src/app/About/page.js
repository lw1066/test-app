"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import FAQAccordion from "../components/FAQAccordion";

const Page = () => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <Image
          src={darkMode ? "/images/darkAbout.webp" : "/images/lightAbout.webp"}
          alt="people talking animation"
          width={60} // Adjust the width as needed
          height={60} // Adjust the height as needed
        />
      </div>
      <FAQAccordion />
    </>
  );
};

export default Page;
