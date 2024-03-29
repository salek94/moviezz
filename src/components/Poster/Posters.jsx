import React, { useEffect, useState, useContext } from "react";
import "../Poster/Posters.scss";
import MovieContext from "../../context/MovieContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import pic from "../../img/MOVIZZ.jpg";
import ScrollTop from "../features/scrollTop/ScrollTop";

const Posters = () => {
  const [query] = useSearchParams();
  const { movie, setMovie, setViewMovieOrTv, setMovieOrTV, chosenGenre } =
    useContext(MovieContext);
  const [flag, setFlag] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [desc, setDesc] = useState(false);
  const [selectedPara, setSelectedPara] = useState();

  const navigate = useNavigate();
  const getQuery = query.get("search");
  const baseUrl = "https://api.themoviedb.org/3/";
  const myApiKey = "api_key=39b7c306441823329a6e5fa506a7906c";

  const getMovieOrTVRequest = async (getQuery) => {
    if (getQuery) {
      const url = `${baseUrl}search/multi?${myApiKey}&query=${getQuery}&language=en-US`;
      const response = await fetch(url);
      const responseJson = await response.json();
      try {
        if (responseJson.results) {
          setMovie(responseJson.results);
          setFlag(true);
          setShowMore(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getMovieOrTVRequest(getQuery);
  }, [getQuery]);

  const getMovieOrTvFromGenre = async (chosenGenre) => {
    const url = `${baseUrl}discover/movie?${myApiKey}&with_genres=${chosenGenre.id}&language=en-US&page=1&sort_by=popularity.desc`;
    if (chosenGenre) {
      try {
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.results) {
          setMovie(responseJson.results);
          setFlag(true);
          setShowMore(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getMovieOrTvFromGenre(chosenGenre);
  }, [chosenGenre]);

  const handleText = (i) => {
    setSelectedPara(i);
    setShowMore(showMore ? false : true);
  };

  const goToView = (movie) => {
    setViewMovieOrTv(movie);
    navigate(`/view/${movie.id}`);
  };

  const handleScroll = () => {
    if (window.scrollY >= 1000) {
      setShowScroll(true);
    } else setShowScroll(false);
  };

  const handleMovieOrTV = (movie) => {
    setMovieOrTV(movie.media_type);
  };

  if (desc) movie?.sort((a, b) => a.popularity - b.popularity);
  else movie?.sort((a, b) => b.popularity - a.popularity);

  const movieArray = movie?.filter((m) => m.media_type === "movie");
  const tvArray = movie?.filter((m) => m.media_type !== "movie");

  return (
    <div className="poster-container" onMouseMove={handleScroll}>
      {showScroll ? <ScrollTop /> : ""}
      <div className="poster-search">
        {chosenGenre ? (
          <h3>Search results for genre: {chosenGenre.name}</h3>
        ) : (
          <h3>Search results for: {getQuery}</h3>
        )}
      </div>

      <div className="poster-info">
        <aside className="poster-info__filter">
          <div className="poster-info__pick">
            Movies
            <span>{movieArray.length}</span>
          </div>
          <div className="poster-info__pick">
            TV Shows<span>{tvArray.length}</span>
          </div>
          <div className="poster-info__order">
            Sort
            <ul>
              <li onClick={() => setDesc(!desc)}>
                {desc ? "Ascending" : "Descending"}
              </li>
            </ul>
          </div>
        </aside>
        <div className="poster-info__results">
          {movie.length === 0 && <h3>No results</h3>}
          {flag &&
            movie?.map((movie, i) => {
              const movieOvr = movie.overview;
              const movieImg = movie.poster_path;
              return (
                <div key={movie.id} className="poster-info__banner">
                  <img
                    className="poster-info__imgPoster"
                    src={
                      movieImg === undefined || movieImg === null
                        ? pic
                        : `https://image.tmdb.org/t/p/w500${movieImg}`
                    }
                    alt=""
                  />

                  <div className="poster-info__details">
                    <h3>{movie.title ? movie.title : movie.original_name}</h3>
                    <p className="poster-info__describe">
                      {selectedPara === i && !showMore
                        ? movieOvr
                        : movieOvr?.substring(0, 250)}
                      <button
                        className={
                          movieOvr?.length < 250
                            ? "poster-info__details--show-none"
                            : "poster-info__details--show"
                        }
                        onClick={() => handleText(i)}
                      >
                        {selectedPara === i && !showMore
                          ? "Show less"
                          : "Show more"}
                      </button>
                    </p>

                    <div className="poster-info__poster-btn">
                      <a
                        href={`/watch/?v=${movie.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btnPrimary btnPrimary--red"
                        onClick={() => handleMovieOrTV(movie)}
                      >
                        Watch Now
                      </a>
                      <button
                        className="btnPrimary"
                        onClick={() => goToView(movie)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Posters;
