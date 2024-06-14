"use client";

import { useRef } from "react";
import Library from "./components/Library";
import NewsAccordion from "./components/NewsAccordion";
import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";

const Home = () => {
  const catalogueRef = useRef(null);

  const handleScrollToCatalogue = () => {
    catalogueRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NewsAccordion onClick={handleScrollToCatalogue} />
      <Library ref={catalogueRef} />
    </>
  );
};

export default Home;
