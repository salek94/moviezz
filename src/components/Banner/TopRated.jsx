import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import MovieContext from "../../context/MovieContext";
import SliderBanner from "../SliderBanner/SliderBanner";

const TopRated = () => {
  const { movieOrTV } = useContext(MovieContext);
  const [moviesTopRated, setMoviesTopRated] = useState("");

  const getMovieTopRated = async (movieOrTV) => {
    const baseUrl = "https://api.themoviedb.org/3/";
    const urlTopRated = `${baseUrl}${movieOrTV}/top_rated?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US&page=1`;

    try {
      const response = await fetch(urlTopRated);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setMoviesTopRated(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieTopRated(movieOrTV);
  }, [movieOrTV]);

  return (
    <div className="container">
      <h3>Top Rated</h3>
      <Slider {...settings}>
        {moviesTopRated &&
          moviesTopRated.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default TopRated;
