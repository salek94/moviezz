import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewMovie.scss";
import MovieContext from "../../context/MovieContext";
import { FaStar, FaHeart } from "react-icons/fa";

const ViewMovie = () => {
  const { viewMovieOrTv, movieGenres } = useContext(MovieContext);
  const navigate = useNavigate();
  console.log(movieGenres);

  // kad se stisne na dugme od nekog zanra da mi izlista taj zanr
  // reviews

  // useEffect(() => {
  //   const getMovieReview = async () => {
  //     const urlMovie =
  //       "https://api.themoviedb.org/3/movie/312221/reviews?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US&page=1";
  //     // "https://api.themoviedb.org/3/discover/movie?api_key=39b7c306441823329a6e5fa506a7906c&with_genres=35,10749&sort_by=popularity.desc";

  //     try {
  //       const response = await fetch(urlMovie);
  //       const responseJson = await response.json();

  //       if (responseJson.results) {
  //         console.log(responseJson.results);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getMovieReview();
  // }, []);

  const goBack = () => {
    navigate(-1);
  };

  const goGenre = (a) => {
    console.log(a);
  };

  return (
    <div>
      <div
        className="view-wrapper"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${viewMovieOrTv.backdrop_path})`,
        }}
      >
        <div className="view-wrapper__about-movie">
          <div className="view-wrapper__about-movie__picture">
            <img
              className="imgPoster"
              src={`https://image.tmdb.org/t/p/original${viewMovieOrTv.poster_path}`}
              alt=""
            />
          </div>
          <div className="view-wrapper__about-movie__details">
            <div className="view-wrapper__about-movie__details__title">
              <h3>
                {viewMovieOrTv.title
                  ? viewMovieOrTv.title
                  : viewMovieOrTv.original_name}
              </h3>
            </div>
            <div className="view-wrapper__about-movie__details__ratings">
              <p>
                <FaStar className="star" />{" "}
                <b>{viewMovieOrTv.vote_average.toFixed(1)}</b>/10
              </p>
              <p>{viewMovieOrTv.vote_count} Users vote</p>
              <p>
                Add to favorite <FaHeart className="favorite" />{" "}
              </p>
            </div>
            <div className="view-wrapper__about-movie__details__list-genre">
              {movieGenres?.map((genreMovie) => {
                const movieOverview = viewMovieOrTv.genre_ids;
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
              <p>
                Release date:{" "}
                {viewMovieOrTv.release_date
                  ? viewMovieOrTv.release_date
                  : viewMovieOrTv.first_air_date}
              </p>
            </div>
            <div className="view-wrapper__about-movie__details__overview">
              {viewMovieOrTv.overview}
            </div>
            <div className="view-wrapper__about-movie__details__btn">
              <button className="btnPrimary btnPrimary--red">Watch Now</button>
              <button className="btnPrimary" onClick={goBack}>
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
