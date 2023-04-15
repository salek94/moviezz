import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import Slider from "react-slick";
import { settingsVideo } from "../SliderBanner/settings";

const Trailers = () => {
  const [urlVideoLink, setUrlVideoLink] = useState();

  const videoTrailers = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/758323/videos?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US";
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results[13].key);
        setUrlVideoLink(responseJson.results[13].key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videoTrailers();
  }, []);

  return (
    <div className="container">
      <h3>Latest Trailers</h3>
      <div className="banner">
        <ReactPlayer
          url={`https://youtu.be/${urlVideoLink}`}
          controls={true}
          muted
          loop={true}
          // playsinline={true}
          // light={true}
          // style={{ borderRadius: "20px", border: "1px solid black" }}
          pip={true}
          stopOnUnmount={false}
          width={"360px"}
          height={"220px"}
        />
      </div>
    </div>
  );
};

export default Trailers;
