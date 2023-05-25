import React, { useContext } from "react";
import "./Playvideo.scss";
import ReactPlayer from "react-player/youtube";
import MovieContext from "../../context/MovieContext";

const Playvideo = () => {
  const { videoKey } = useContext(MovieContext);

  console.log(videoKey);
  return (
    <div className="video-container">
      <ReactPlayer url={`https://www.youtube.com/watch?v=${videoKey}`} />
    </div>
  );
};

export default Playvideo;
