import React, { useEffect } from "react";
import { useContext } from "react";
import "../Poster/Posters.scss";
import MovieContext from "../../context/MovieContext";
import { Link, useSearchParams } from "react-router-dom";

const Posters = () => {
  const [query, setQuery] = useSearchParams();
  const { movie, setMovie } = useContext(MovieContext);

  const getMovieRequest = async (getQuery) => {
    if (getQuery) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=39b7c306441823329a6e5fa506a7906c&query=${getQuery}`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        console.log(responseJson.results);
        setMovie(responseJson.results);
      }
    }
  };

  useEffect(() => {
    const getQuery = query.get("search");
    getMovieRequest(getQuery);
  }, [query]);

  return (
    <>
      <h2>dawdwa</h2>

      <div className="container-poster d-flex">
        {movie.map((movie) => {
          return (
            <div key={movie.id} className="row">
              <img
                className="imgPoster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
              <p>{movie.title}</p>
              <p>{movie.overview}</p>
              <div className="flex-btn">
                <button>
                  <Link to={`/view/${movie.id}`}>More Details</Link>
                </button>
                <button>Watch Now</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Posters;
