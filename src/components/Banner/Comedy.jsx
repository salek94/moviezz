import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import MovieContext from "../../context/MovieContext";
import SliderBanner from "../SliderBanner/SliderBanner";

const Comedy = () => {
  const { movieOrTV } = useContext(MovieContext);
  const [moviesComedy, setMoviesComedy] = useState("");

  const getMovieComedy = async (movieOrTV) => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";
    const myApiKey = "api_key=39b7c306441823329a6e5fa506a7906c";
    const urlComedy = `${baseUrl}${movieOrTV}?${myApiKey}&with_genres=35,10749&sort_by=popularity.desc`;

    try {
      const response = await fetch(urlComedy);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setMoviesComedy(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieComedy(movieOrTV);
  }, [movieOrTV]);

  return (
    <div className="container">
      <h3>Comedy</h3>
      <Slider {...settings}>
        {moviesComedy &&
          moviesComedy.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Comedy;
