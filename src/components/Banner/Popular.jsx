import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import MovieContext from "../../context/MovieContext";
import SliderBanner from "../SliderBanner/SliderBanner";

const Popular = () => {
  const [moviesPopular, setMoviesPopular] = useState("");
  const { movieOrTV } = useContext(MovieContext);

  const getMoviePopular = async (movieOrTV) => {
    const urlPopular = `https://api.themoviedb.org/3/${movieOrTV}/popular?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US&page=1`;

    try {
      const response = await fetch(urlPopular);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setMoviesPopular(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoviePopular(movieOrTV);
  }, [movieOrTV]);

  return (
    <div className="container">
      <h3>Popular</h3>
      <Slider {...settings}>
        {moviesPopular &&
          moviesPopular.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Popular;
