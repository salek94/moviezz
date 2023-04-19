import React, { useContext, useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";

const SliderBanner = ({ movie }) => {
  const { setMovie, favoriteMovie, setFavoriteMovie } =
    useContext(MovieContext);
  const [aa, setAa] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  const goToViewMovie = (movie) => {
    setMovie(movie);
    navigate(`/view/${movie.id}`);
  };

  const addFavorite = (a, b) => {
    // const picTitle = [movie.original_title, movie.poster_path];
    const picTitle = [a, b];
    localStorage.setItem("favorite", JSON.stringify(picTitle));
    const getFavoriteMovie = JSON.parse(localStorage.getItem("favorite"));
    // setAa(true);

    setFavoriteMovie((picTitle) => [...picTitle, getFavoriteMovie]);

    // console.log(favoriteMovie);
    // ref.current = getFavoriteMovie;
    // console.log(ref.current);
  };

  // useEffect(() => {
  //   const getFavoriteMovie = JSON.parse(localStorage.getItem("favorite"));

  //   if (aa) {
  //     setFavoriteMovie((getFavoriteMovie) => [
  //       ...getFavoriteMovie,
  //       getFavoriteMovie,
  //     ]);
  //   }

  //   return () => {
  //     setAa(false);
  //   };

  //   console.log(favoriteMovie);
  // }, []);
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
        {/* <h5>{movie.original_title}</h5> */}
        <span
          onClick={() => addFavorite(movie.original_title, movie.poster_path)}
        >
          <FaHeart />
        </span>
      </div>
    </div>
  );
};

export default SliderBanner;
