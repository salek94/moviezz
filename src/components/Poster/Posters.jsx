import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import "../Poster/Posters.scss";
import MovieContext from "../../context/MovieContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Posters = () => {
  const [query, setQuery] = useSearchParams();
  const { movie, setMovie } = useContext(MovieContext);
  const [flag, setFlag] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const getQuery = query.get("search");
  const showMoreDetails = useRef([]);

  const getMovieRequest = async (getQuery) => {
    if (getQuery) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=39b7c306441823329a6e5fa506a7906c&query=${getQuery}`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        // console.log(responseJson.results);
        setMovie(responseJson.results);
        setFlag(true);
        setShowMore(false);
      }
    }
  };

  useEffect(() => {
    getMovieRequest(getQuery);
  }, [query]);

  const showMoreText = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
    if (e.target) {
      // showMoreDetails.current.setAttribute("name", "a");
    }
  };

  const goToView = (movie) => {
    setMovie(movie);
    navigate(`/view/${movie.id}`);
  };

  return (
    <div className="poster-container">
      <div className="poster-search">
        <h3>Search results for: {getQuery}</h3>
      </div>

      <div className="poster-info">
        <aside className="poster-info__filter">
          <div>Movies</div>
          <div>TV Shows</div>
          <div>
            Genres
            <ul>
              <li>a</li>
              <li>b</li>
              <li>c</li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            Ratings
            <ul>
              <li>a</li>
              <li>b</li>
            </ul>
          </div>
          <div>Year</div>
        </aside>
        <div className="poster-info__results">
          {flag &&
            movie.map((movie) => {
              const movieOvr = movie.overview;
              return (
                <div key={movie.id} className="poster-info__results__banner">
                  <img
                    className="imgPoster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt=""
                  />

                  <div className="poster-info__results__banner__details">
                    <h3>{movie.title}</h3>

                    <p ref={showMoreDetails}>
                      {showMore ? movieOvr : movieOvr.substring(0, 250)}
                      <button
                        className={movieOvr.length < 250 && "none"}
                        // onClick={() => showMoreText(movie)}
                        onClick={showMoreText}
                        // ne znam kako samo jedan div da pokaze
                      >
                        {showMore ? "Show less" : "Show more"}
                      </button>
                    </p>

                    <div className="poster-info__results__banner__details__poster-btn">
                      <button className="btnPrimary redColorBtn">
                        Watch Now
                      </button>
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
