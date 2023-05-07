import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";

const SliderBanner = ({ movie }) => {
  const { setViewMovieOrTv, favorite, setFavorite } = useContext(MovieContext);
  const navigate = useNavigate();

  const goToViewMovie = (movie) => {
    setViewMovieOrTv(movie);
    navigate(`/view/${movie.id}`);
  };

  const addFavorite = (a, b, c) => {
    // const picTitle = [movie.original_title, movie.poster_path];
    const picTitle = {
      name: a,
      pic: b,
      id: c,
    };
    if (picTitle.id !== favorite.id) setFavorite((prev) => [...prev, picTitle]);
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
        <button className="btnPrimary btnPrimary--red">Watch Now</button>
        <span
          onClick={() =>
            addFavorite(movie.original_title, movie.poster_path, movie.id)
          }
        >
          <FaHeart />
        </span>
      </div>
    </div>
  );
};

export default SliderBanner;
