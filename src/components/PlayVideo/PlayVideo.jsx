import React from "react";
import ReactPlayer from "react-player/youtube";

const PlayVideo = ({ videoKey }) => {
  return (
    <div>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${videoKey}`} />
    </div>
  );
};

export default PlayVideo;
