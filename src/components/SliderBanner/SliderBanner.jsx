import React, { useContext, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { json, useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";

const SliderBanner = ({ movie }) => {
  const { setMovie, favorite, setFavorite } = useContext(MovieContext);

  const navigate = useNavigate();

  const goToViewMovie = (movie) => {
    setMovie(movie);
    navigate(`/view/${movie.id}`);
  };
  useEffect(() => {});
  const addFavorite = (movie) => {
    const picTitle = [movie.original_title, movie.poster_path];
    const favoriteMovie = localStorage.setItem(
      "favorite",
      JSON.stringify(picTitle)
    );
    // if (favoriteMovie) {
    const getFavoriteMovie = JSON.parse(localStorage.getItem("favorite"));
    setFavorite((prev) => {
      return { ...prev, getFavoriteMovie };
    });
    console.log(getFavoriteMovie);
    console.log(favorite);
    // }
  };

  return (
    <div className="banner">
      <img
        className="imgPoster"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt=""
      />
      <div className="banner__overview">
        <button className="btnPrimary" onClick={() => goToViewMovie(movie)}>
          Overview
        </button>
        <button
          className="btnPrimary redColor"
          onClick={() => goToViewMovie(movie)}
        >
          Watch Now
        </button>
        <span>
          <FaHeart onClick={() => addFavorite(movie)} />
        </span>
      </div>
    </div>
  );
};

export default SliderBanner;
