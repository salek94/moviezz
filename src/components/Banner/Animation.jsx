import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import MovieContext from "../../context/MovieContext";
import SliderBanner from "../SliderBanner/SliderBanner";

const Animation = () => {
  const { movieOrTV } = useContext(MovieContext);
  const [moviesAnimation, setMoviesAnimation] = useState("");

  const getMovieAnimation = async (movieOrTV) => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";
    const myApiKey = "api_key=39b7c306441823329a6e5fa506a7906c";
    const urlAnimation = `${baseUrl}${movieOrTV}?${myApiKey}&with_genres=16,12,14&sort_by=popularity.desc`;

    try {
      const response = await fetch(urlAnimation);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setMoviesAnimation(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieAnimation(movieOrTV);
  }, [movieOrTV]);

  return (
    <div className="container">
      <h3>Animation</h3>
      <Slider {...settings}>
        {moviesAnimation &&
          moviesAnimation.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Animation;
