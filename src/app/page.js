"use client";

import { useEffect } from "react";
import Library from "./components/Library";
import classes from "./components/Library.module.css";
import WelcomeMessage from "./components/WelcomeMessage";
import NewsCarousel from "./components/NewsCarousel";
import { useModal } from "@/context/ModalContext";

const Home = () => {
  const { showModal } = useModal();

  useEffect(() => {
    const showModalAfterReload = localStorage.getItem("showModalAfterReload");
    const modalMessage = localStorage.getItem("modalMessage");

    if (showModalAfterReload === "true" && modalMessage) {
      showModal("book added", modalMessage);
      localStorage.removeItem("showModalAfterReload");
      localStorage.removeItem("modalMessage");
    }
  }, []);

  return (
    <>
      <WelcomeMessage />
      <div className={classes.frontPageContainer}>
        <Library />
        <NewsCarousel />
      </div>
    </>
  );
};

export default Home;
