import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";

const SliderBanner = ({ movie }) => {
  const { setViewMovieOrTv, favoriteMovie, setFavoriteMovie } =
    useContext(MovieContext);
  const navigate = useNavigate();

  const goToViewMovie = (movie) => {
    setViewMovieOrTv(movie);
    navigate(`/view/${movie.id}`);
  };

  const addFavorite = (a, b) => {
    // const picTitle = [movie.original_title, movie.poster_path];
    const picTitle = [a, b];
    localStorage.setItem("favorite", JSON.stringify(picTitle));
    const getFavoriteMovie = JSON.parse(localStorage.getItem("favorite"));
    setFavoriteMovie((picTitle) => [...picTitle, getFavoriteMovie]);
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

  console.log(favoriteMovie);
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
          // onClick={() => goToViewMovie(movie)}
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
