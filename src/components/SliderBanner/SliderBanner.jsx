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
    const picTitle = {
      name: a,
      pic: b,
      id: c,
    };
    for (let i = 0; i < favorite.length; i++) {
      const element = favorite[i];
      if (element.id === picTitle.id) return null;
    }
    setFavorite((prev) => [...prev, picTitle]);
  };

  return (
    <div className="banner">
      <img
        loading="lazy"
        className="imgPoster"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt=""
      />
      <div className="banner__overview">
        <button className="btnPrimary" onClick={() => goToViewMovie(movie)}>
          Overview
        </button>
        <a
          href={`/watch/?v=${movie.id}`}
          target="_blank"
          rel="noreferrer"
          className="btnPrimary btnPrimary--red"
        >
          Watch Now
        </a>
        <span
          onClick={
            favorite.length < 6
              ? () =>
                  addFavorite(movie.original_title, movie.poster_path, movie.id)
              : null
          }
        >
          <FaHeart />
        </span>
      </div>
    </div>
  );
};

export default SliderBanner;
