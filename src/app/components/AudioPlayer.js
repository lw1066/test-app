import React from "react";
import ReactPlayer from "react-player";

const AudioPlayer = ({ url }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactPlayer
        url={url}
        playing={false}
        controls={true}
        width="50%"
        height="150px"
      />
    </div>
  );
};

export default AudioPlayer;
