import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import "./HeroImage.scss";
import random2 from "../../img/BreakingBad.jpg";
import random5 from "../../img/JW4.jpg";
import MovieContext from "../../context/MovieContext";
import { Link } from "react-router-dom";
import { FaAngleDoubleDown } from "react-icons/fa";
import Loader from "../Loader/Loader";

const HeroImage = () => {
  const {
    movieGenres,
    setMovieOrTV,
    setClickedMovie,
    setClickedTVshow,
    setMovieGenres,
  } = useContext(MovieContext);

  const [transitionMovie, setTransitionMovie] = useState(false);
  const [transitionTV, setTransitionTV] = useState(false);
  const [imgPopularMovie, setImgPopularMovie] = useState("");
  const [imgPopularTV, setImgPopularTV] = useState("");

  const handleMovie = () => {
    setTimeout(() => {
      setClickedMovie(true);
      setClickedTVshow(false);
      setMovieOrTV("movie");
    }, 2500);
    setTransitionMovie(true);
    setTransitionTV(false);
    // navigate("/home/movies");
  };

  const handleTVshow = () => {
    setTimeout(() => {
      setClickedTVshow(true);
      setClickedMovie(false);
      setMovieOrTV("tv");
    }, 2500);
    setTransitionTV(true);
    setTransitionMovie(false);
  };

  const backTransition = () => {
    setTransitionMovie(false);
    setTransitionTV(false);
  };

  const getMovieGenre = async () => {
    const urlMovie =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=39b7c306441823329a6e5fa506a7906c";

    try {
      const response = await fetch(urlMovie);
      const responseJson = await response.json();

      if (responseJson.genres) {
        // console.log(responseJson.genres);
        setMovieGenres(responseJson.genres);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useMemo(() => {
    getMovieGenre();
  }, []);

  const getPopularMovie = useCallback(async () => {
    const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US&page=1`;

    try {
      const response = await fetch(urlPopular);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        let a = responseJson.results;
        let rand = Math.floor(Math.random() * 20);
        setImgPopularMovie(a[rand]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPopularMovie();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getPopularMovie();
    }, 10000);
    return () => clearInterval(interval);
  }, [getPopularMovie]);

  const getPopularTV = useCallback(async () => {
    const urlPopular = `https://api.themoviedb.org/3/tv/top_rated?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US&page=1`;

    try {
      const response = await fetch(urlPopular);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        let a = responseJson.results;
        let rand = Math.floor(Math.random() * 20);
        setImgPopularTV(a[rand]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPopularTV();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getPopularTV();
    }, 10000);
    return () => clearInterval(interval);
  }, [getPopularTV]);

  // useEffect(() => {
  //   let controller = new AbortController();
  //   (async () => {
  //     const urlMovie =
  //       "https://api.themoviedb.org/3/genre/movie/list?api_key=39b7c306441823329a6e5fa506a7906c";

  //     try {
  //       const response = await fetch(urlMovie, {
  //         signal: controller.signal,
  //       });
  //       const responseJson = await response.json();

  //       if (responseJson.genres) {
  //         // console.log(responseJson.genres);
  //         setMovieGenres(responseJson.genres);
  //         controller = null;
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  //   return () => controller?.abort();
  // }, []);
  // console.log(movieGenres);

  return (
    <>
      <div className="heroImg">
        <div
          className={
            !transitionMovie && !transitionTV
              ? "heroImg__title"
              : "heroImg__title--none"
          }
        >
          <p className="title__welcome">
            Welcome.
            <br />
            Choose your favorite TV Show or Movie.
          </p>
        </div>
        <a className="heroImg__arrow" href={"#trend"}>
          <FaAngleDoubleDown />
        </a>
        {/* <button onClick={backTransition}>go back</button> */}
        <div
          style={{
            backgroundImage: `linear-gradient(
              to right,
              rgba(200, 188, 21, 0.41),
              rgba(237, 226, 15, 0.43)
            ), url(https://image.tmdb.org/t/p/original${imgPopularTV.backdrop_path})`,
          }}
          className={`heroImg__left${
            transitionMovie ? "--transition-movie" : ""
          }${transitionTV ? "--transition-tv" : ""}`}
        >
          <div
            className={`heroImg__left${
              transitionMovie ? "--transition-movie" : ""
            }${transitionTV ? "--transition-tv" : ""}__tv-info`}
          >
            <h2>{imgPopularTV.title || imgPopularTV.original_name}</h2>
            <p>
              <b>{imgPopularTV?.overview?.substring(0, 200)}</b>...
            </p>
            <button className="btnPrimary redColorBtn">Watch Now </button>
          </div>
          <Link
            to={"/home/tv"}
            // className="heroImg__left__btnHero btnPrimary"
            className={`heroImg__left${
              transitionMovie ? "--transition-movie" : ""
            }${transitionTV ? "--transition-tv" : ""}__btnHero btnPrimary`}
            onClick={handleTVshow}
          >
            TV Shows
          </Link>
        </div>
        <div
          style={{
            backgroundImage: `linear-gradient(
              to left,
              rgba(131, 39, 39, 0.6),
              rgba(166, 21, 21, 0.6)
            ), url(https://image.tmdb.org/t/p/original${imgPopularMovie.backdrop_path})`,
          }}
          className={`heroImg__right${
            transitionMovie ? "--transition-movie" : ""
          }${transitionTV ? "--transition-tv" : ""}`}
        >
          {" "}
          <div
            className={`heroImg__right${
              transitionMovie ? "--transition-movie" : ""
            }${transitionTV ? "--transition-tv" : ""}__movie-info`}
          >
            <h2>{imgPopularMovie.title}</h2>
            <p>
              <b>{imgPopularMovie?.overview?.substring(0, 200)}</b>...
            </p>
            <button className="btnPrimary redColorBtn">Watch Now</button>
          </div>
          <Link
            to={"/home/movies"}
            className={`heroImg__right${
              transitionMovie ? "--transition-movie" : ""
            }${transitionTV ? "--transition-tv" : ""}__btnHero btnPrimary`}
            onClick={handleMovie}
          >
            Movies
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroImage;
