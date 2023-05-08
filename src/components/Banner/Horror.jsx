import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import MovieContext from "../../context/MovieContext";
import SliderBanner from "../SliderBanner/SliderBanner";

const Horror = () => {
  const { movieOrTV } = useContext(MovieContext);
  const [moviesHorror, setMoviesHorror] = useState("");

  const getMovieHorror = async (movieOrTV) => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";
    const urlHorror = `${baseUrl}${movieOrTV}?api_key=39b7c306441823329a6e5fa506a7906c&with_genres=27,53&sort_by=popularity.desc`;

    try {
      const response = await fetch(urlHorror);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setMoviesHorror(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieHorror(movieOrTV);
  }, [movieOrTV]);

  return (
    <div className="container">
      <h3>Horror</h3>
      <Slider {...settings}>
        {moviesHorror &&
          moviesHorror.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Horror;
