import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import SliderBanner from "../SliderBanner/SliderBanner";

const Documentary = () => {
  const [TVDocumentary, setTVDocumentary] = useState("");

  const getMovieDocumentary = async () => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";
    const myApiKey = "api_key=39b7c306441823329a6e5fa506a7906c";
    const urlDocumentary = `${baseUrl}tv?${myApiKey}&with_genres=99&sort_by=popularity.desc`;

    try {
      const response = await fetch(urlDocumentary);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setTVDocumentary(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDocumentary();
  }, []);

  return (
    <div className="container">
      <h3>Documentary</h3>
      <Slider {...settings}>
        {TVDocumentary &&
          TVDocumentary.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Documentary;
