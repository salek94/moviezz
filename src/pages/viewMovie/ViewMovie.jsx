import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewMovie.scss";
import MovieContext from "../../context/MovieContext";
import { FaStar, FaHeart } from "react-icons/fa";

const ViewMovie = () => {
  const { viewMovieOrTv, movieGenres, setFavorite } = useContext(MovieContext);
  const navigate = useNavigate();
  // console.log(movieGenres);

  // reviews

  // useEffect(() => {
  //   const getMovieReview = async () => {
  //     const urlMovie =
  //       "https://api.themoviedb.org/3/movie/312221/reviews?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US&page=1";

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

  const handleClickedGenre = (a) => {
    console.log(a);
  };

  const addToFav = (a, b, c) => {
    const picTitle = {
      name: a,
      pic: b,
      id: c,
    };
    setFavorite((prev) => [...prev, picTitle]);
  };

  return (
    <div>
      <div
        className="overview-container"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${viewMovieOrTv.backdrop_path})`,
        }}
      >
        <div className="overview-about">
          <div className="overview-about__picture">
            <img
              className="imgPoster"
              src={`https://image.tmdb.org/t/p/original${viewMovieOrTv.poster_path}`}
              alt=""
            />
          </div>
          <div className="overview-about__details">
            <div className="overview-about__title">
              <h3>
                {viewMovieOrTv.title
                  ? viewMovieOrTv.title
                  : viewMovieOrTv.original_name}
              </h3>
            </div>
            <div className="overview-about__ratings">
              <p>
                <FaStar className="star" />{" "}
                <b>{viewMovieOrTv.vote_average.toFixed(1)}</b>/10
              </p>
              <p>{viewMovieOrTv.vote_count} Users vote</p>
              <p
                onClick={() =>
                  addToFav(
                    viewMovieOrTv.title,
                    viewMovieOrTv.poster_path,
                    viewMovieOrTv.id
                  )
                }
              >
                Add to favorite <FaHeart className="favorite" />{" "}
              </p>
            </div>
            <div className="overview-about__list-genre">
              {movieGenres?.map((genreMovie, idx) => {
                const movieOverview = viewMovieOrTv.genre_ids;
                for (let i = 0; i < movieOverview.length; i++) {
                  if (genreMovie.id === movieOverview[i]) {
                    return (
                      <p
                        key={idx}
                        className="genre"
                        onClick={() => handleClickedGenre(genreMovie.name)}
                      >
                        {genreMovie.name}
                      </p>
                    );
                  }
                }
              })}
            </div>
            <div className="overview-about__date">
              <p>
                Release date:{" "}
                {viewMovieOrTv.release_date
                  ? viewMovieOrTv.release_date
                  : viewMovieOrTv.first_air_date}
              </p>
            </div>
            <div className="overview-about__paragraph">
              {viewMovieOrTv.overview}
            </div>
            <div className="overview-about__btn">
              <a
                href={`/watch/?v=${viewMovieOrTv.id}`}
                target="_blank"
                rel="noreferrer"
                className="btnPrimary btnPrimary--red"
              >
                Watch Now
              </a>
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
