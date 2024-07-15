"use client";

import Library from "./components/Library";
import classes from "./components/Library.module.css";
import WelcomeMessage from "./components/WelcomeMessage";
import NewsCarousel from "./components/NewsCarousel";
import RecommendationsCarousel from "./components/RecommendationsCarousel";

const Home = () => {
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
