"use client";

import React from "react";
import AudioPlayer from "../components/AudioPlayer";

const Home = () => {
  const audioUrl = "./Helping Matters Unit 1.mp3";

  return (
    <div>
      <h1
        style={{ textAlign: "center", margin: "1rem" }}
      >{`Now playing ${audioUrl.substring(2, audioUrl.length - 4)}`}</h1>
      <AudioPlayer url={audioUrl} />
    </div>
  );
};

export default Home;
