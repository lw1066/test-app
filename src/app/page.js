"use client";

import Library from "./components/Library";
import NewsAccordion from "./components/NewsAccordion";
import classes from "./components/Library.module.css";
import WelcomeMessage from "./components/WelcomeMessage";

const Home = () => {
  return (
    <div className={classes.frontPage}>
      <WelcomeMessage />
      <NewsAccordion />
      <Library />
    </div>
  );
};

export default Home;
