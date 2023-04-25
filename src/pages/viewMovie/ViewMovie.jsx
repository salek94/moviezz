import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewMovie.scss";
import MovieContext from "../../context/MovieContext";
import { FaStar, FaHeart } from "react-icons/fa";

const ViewMovie = () => {
  const { movie, setFavorite } = useContext(MovieContext);
  const [movieGenres, setMovieGenres] = useState();
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();
  // const params = useParams();

  console.log(movie);

  const getMovieGenre = async () => {
    const urlMovie =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=39b7c306441823329a6e5fa506a7906c";

    // const urrTV =
    //   "https://api.themoviedb.org/3/genre/tv/list?api_key=39b7c306441823329a6e5fa506a7906c";

    try {
      const response = await fetch(urlMovie);
      const responseJson = await response.json();

      if (responseJson.genres && flag) {
        console.log(responseJson.genres);
        setMovieGenres(responseJson.genres);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieGenre();
    return () => {
      setFlag(false);
    };
  }, []);

  const goHome = () => {
    navigate("/home");
  };

  const goGenre = (a) => {
    console.log(a);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div
        key={movie.id}
        className="view-wrapper"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="view-wrapper__about-movie">
          <div className="view-wrapper__about-movie__picture">
            <img
              className="imgPoster"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="view-wrapper__about-movie__details">
            <div className="view-wrapper__about-movie__details__title">
              <h3>{movie.title ? movie.title : movie.original_name}</h3>
            </div>
            <div className="view-wrapper__about-movie__details__ratings">
              <p>
                <FaStar className="star" />{" "}
                <b>{movie.vote_average.toFixed(1)}</b>/10
              </p>
              <p>{movie.vote_count} Users vote</p>
              <p>
                Add to favorite <FaHeart className="favorite" />{" "}
              </p>
            </div>
            <div className="view-wrapper__about-movie__details__list-genre">
              {movieGenres?.map((genreMovie) => {
                const movieOverview = movie.genre_ids;

                for (let i = 0; i < movieOverview.length; i++) {
                  if (genreMovie.id === movieOverview[i]) {
                    return (
                      <p
                        // key={movie.id}
                        className="genre"
                        onClick={() => goGenre(genreMovie.name)}
                      >
                        {genreMovie.name}
                      </p>
                    );
                  }
                }
              })}
            </div>
            <div className="view-wrapper__about-movie__details__date">
              <p>Release date: {movie.release_date}</p>
            </div>
            <div className="view-wrapper__about-movie__details__overview">
              {movie.overview}
            </div>
            <div className="view-wrapper__about-movie__details__btn">
              <button className="view-wrapper__about-movie__details__btn-watch btnPrimary red">
                Watch Now
              </button>
              <button
                className="view-wrapper__about-movie__details__btn-back btnPrimary"
                onClick={goHome}
              >
                Search More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMovie;
