import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "../Poster/Posters.scss";
import MovieContext from "../../context/MovieContext";
import { Link, useSearchParams } from "react-router-dom";

const Posters = () => {
  const [query, setQuery] = useSearchParams();
  const { movie, setMovie } = useContext(MovieContext);
  const [flag, setFlag] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const getMovieRequest = async (getQuery) => {
    if (getQuery) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=39b7c306441823329a6e5fa506a7906c&query=${getQuery}`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        console.log(responseJson.results);
        setMovie(responseJson.results);
        setFlag(true);
      }
    }
  };

  useEffect(() => {
    const getQuery = query.get("search");
    getMovieRequest(getQuery);
  }, [query]);

  const showMoreText = () => {
    setShowMore(showMore ? false : true);
  };

  return (
    <div className="poster-container">
      <div className="poster-search">
        <h3>Search results for:...</h3>
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
              return (
                <div key={movie.id} className="poster-info__results__banner">
                  <img
                    className="imgPoster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt=""
                  />

                  <div className="poster-info__results__banner__details">
                    <h3>{movie.title}</h3>
                    <p>
                      {showMore
                        ? movie.overview
                        : movie.overview.substring(0, 250)}
                      <button
                        className={movie.overview.length < 250 && `none`}
                        onClick={showMoreText}
                      >
                        See more
                      </button>
                    </p>

                    <div>
                      <button>Watch Now</button>
                      <button>
                        <Link to={`/view/${movie.id}`}>More Details</Link>
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
