import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../context/MovieContext";
import PlayVideo from "../PlayVideo/PlayVideo";

const SliderBanner = ({ movie }) => {
  const { setViewMovieOrTv, favorite, setFavorite, setVideoOn, videoOn } =
    useContext(MovieContext);
  const [videoKey, setVideoKey] = useState("");
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

  const getVideos = async (movie) => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=39b7c306441823329a6e5fa506a7906c`;

    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        console.log(responseJson.results);
        setVideoKey(responseJson.results.key);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideos(movie);
  }, []);

  return !videoOn ? (
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
          className="btnPrimary btnPrimary--red"
          onClick={() => setVideoOn(true)}
        >
          Watch Now
        </button>
        <span
          onClick={() =>
            addFavorite(movie.original_title, movie.poster_path, movie.id)
          }
        >
          <FaHeart />
        </span>
      </div>
    </div>
  ) : (
    <PlayVideo videoKey={videoKey} />
  );
  // <div className="banner">
  //   <img
  //     className="imgPoster"
  //     src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
  //     alt=""
  //   />
  //   <div className="banner__overview">
  //     <button className="btnPrimary" onClick={() => goToViewMovie(movie)}>
  //       Overview
  //     </button>
  //     <button
  //       className="btnPrimary btnPrimary--red"
  //       onClick={() => setVideoOn(true)}
  //     >
  //       Watch Now
  //     </button>
  //     <span
  //       onClick={() =>
  //         addFavorite(movie.original_title, movie.poster_path, movie.id)
  //       }
  //     >
  //       <FaHeart />
  //     </span>
  //   </div>
  //   {/* {videoOn && <PlayVideo videoKey={videoKey} />} */}
  // </div>
};

export default SliderBanner;
