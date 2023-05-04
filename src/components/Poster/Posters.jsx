import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import "../Poster/Posters.scss";
import MovieContext from "../../context/MovieContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import pic from "../../img/MOVIZZ.jpg";
import axios from "axios";

const Posters = () => {
  const [query] = useSearchParams();
  const { movie, setMovie, setViewMovieOrTv } = useContext(MovieContext);
  const [flag, setFlag] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const getQuery = query.get("search");
  const showMoreDetails = useRef();
  // console.log(movieGenres);
  console.log(movie);

  // ratings od vecem ka manjem i obratno
  // year (napraviti input pa da kucaju y:2002 )
  // pagination
  // scroll to top

  const getMovieRequest = async (getQuery) => {
    if (getQuery) {
      const url = `https://api.themoviedb.org/3/search/multi?api_key=39b7c306441823329a6e5fa506a7906c&query=${getQuery}&language=en-US`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.results) {
        // console.log(responseJson.total_pages);
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
    setViewMovieOrTv(movie);
    navigate(`/view/${movie.id}`);
  };

  const movieArray = movie?.filter((m) => m.media_type === "movie");
  const tvArray = movie?.filter((m) => m.media_type !== "movie");

  return (
    <div className="poster-container">
      <div className="poster-search">
        <h3>Search results for: {getQuery}</h3>
      </div>

      <div className="poster-info">
        <aside className="poster-info__filter">
          <div>Movies {movieArray.length}</div>
          <div>TV Shows {tvArray.length}</div>
          {/* <div>
            Genres
            <ul>
              {movieGenres?.map((item) => {
                const genreGeneral = item.name;
                const genreGeneralId = item.id;
                let freq = [];
                for (let i = 0; i < movie?.length; i++) {
                  const ele = movie[i].genre_ids;
                  for (let i = 0; i < ele?.length; i++) {
                    const num = ele[i];
                    freq.push(num);
                  }
                  let frequencyArray = [];
                  for (let i = 0; i < freq?.length; i++) {
                    frequencyArray.push([freq[i], i]);
                    // console.log(frequencyArray[i]);
                    if (genreGeneralId === frequencyArray[i][0]) {
                      return (
                        <li>
                          {genreGeneral}
                          {frequencyArray[i][1] + 1}
                        </li>
                      );
                    }
                  }
                  // return frequencyArray[i];
                }
              })}
            </ul>
          </div> */}
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
          {movie.length === 0 && <h3>No results</h3>}
          {flag &&
            movie?.map((movie) => {
              const movieOvr = movie.overview;
              const movieImg = movie.poster_path;
              return (
                <div key={movie.id} className="poster-info__results__banner">
                  <img
                    className="imgPoster"
                    src={
                      movieImg === undefined || movieImg === null
                        ? pic
                        : `https://image.tmdb.org/t/p/w500${movieImg}`
                    }
                    alt=""
                  />

                  <div className="poster-info__results__banner__details">
                    <h3>{movie.title ? movie.title : movie.original_name}</h3>
                    <p ref={showMoreDetails}>
                      {showMore ? movieOvr : movieOvr?.substring(0, 250)}
                      <button
                        className={movieOvr?.length < 250 ? "none" : ""}
                        // onClick={() => showMoreText(movie)}
                        onClick={showMoreText}
                        // ne znam kako samo jedan div da pokaze
                      >
                        {showMore ? "Show less" : "Show more"}
                      </button>
                    </p>

                    <div className="poster-info__results__banner__details__poster-btn">
                      <button className="btnPrimary btnPrimary--red ">
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
