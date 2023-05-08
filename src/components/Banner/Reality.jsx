import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import SliderBanner from "../SliderBanner/SliderBanner";

const Reality = () => {
  const [TVReality, setTVReality] = useState("");

  const getMovieReality = async () => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";
    const urlReality = `${baseUrl}tv?api_key=39b7c306441823329a6e5fa506a7906c&with_genres=10764&sort_by=popularity.desc`;

    try {
      const response = await fetch(urlReality);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setTVReality(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieReality();
  }, []);

  return (
    <div className="container">
      <h3>Reality</h3>
      <Slider {...settings}>
        {TVReality &&
          TVReality.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Reality;
