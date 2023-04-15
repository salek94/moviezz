import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";

const SliderBanner = ({ movie }) => {
  const { setMovie } = useContext(MovieContext);

  const navigate = useNavigate();

  const goToViewMovie = (movie) => {
    setMovie(movie);
    navigate(`/view/${movie.id}`);
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
          <FaHeart />
        </span>
      </div>
    </div>
  );
};

export default SliderBanner;
