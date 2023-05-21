import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import MovieContext from "../../context/MovieContext";
import SliderBanner from "../SliderBanner/SliderBanner";

const Action = () => {
  const { movieOrTV } = useContext(MovieContext);
  const [moviesAction, setMoviesAction] = useState("");

  const getMovieAction = async (movieOrTV) => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";

    const urlAction =
      movieOrTV === "movie"
        ? `${baseUrl}movie?api_key=39b7c306441823329a6e5fa506a7906c&with_genres=18&sort_by=popularity.desc`
        : `${baseUrl}tv?api_key=39b7c306441823329a6e5fa506a7906c&with_genres=10759&sort_by=popularity.desc`;

    try {
      const response = await fetch(urlAction);
      const responseJson = await response.json();

      if (responseJson) {
        console.log(responseJson.results);
        setMoviesAction(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieAction(movieOrTV);
  }, [movieOrTV]);

  return (
    <div className="container">
      <h3>Action</h3>
      <Slider {...settings}>
        {moviesAction &&
          moviesAction.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Action;
