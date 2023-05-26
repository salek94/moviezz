import React, { useState, useEffect, useContext } from "react";
import "./Playvideo.scss";
import ReactPlayer from "react-player/youtube";
import { useSearchParams } from "react-router-dom";
import MovieContext from "../../context/MovieContext";

const Playvideo = () => {
  const { movieOrTV } = useContext(MovieContext);
  const [videoKey, setVideoKey] = useState("");
  const [movieKeyQuery] = useSearchParams("");
  const query = movieKeyQuery.get("v");

  const getVideos = async (query) => {
    const baseUrl = "https://api.themoviedb.org/3/";
    const myApiKey = "api_key=39b7c306441823329a6e5fa506a7906c";
    const url = `${baseUrl}${movieOrTV}/${query}/videos?${myApiKey}`;

    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        setVideoKey(responseJson.results[0].key);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideos(query);
  }, [query]);

  console.log(videoKey);
  return (
    <div className="video-container">
      <div className="video-player">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          controls={true}
          volume={0}
          muted={true}
          width={"80em"}
          height={"34em"}
        />
      </div>
    </div>
  );
};

export default Playvideo;
