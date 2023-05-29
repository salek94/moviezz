import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import "./HeroImage.scss";
import MovieContext from "../../context/MovieContext";
import { Link } from "react-router-dom";
import { FaAngleDoubleDown } from "react-icons/fa";

const HeroImage = () => {
  const {
    setMovieOrTV,
    setClickedMovie,
    clickedMovie,
    clickedTVshow,
    setClickedTVshow,
    setMovieGenres,
    arrowIconDisable,
  } = useContext(MovieContext);

  const [transitionMovie, setTransitionMovie] = useState(false);
  const [transitionTV, setTransitionTV] = useState(false);
  const [imgPopularMovie, setImgPopularMovie] = useState("");
  const [imgPopularTV, setImgPopularTV] = useState("");
  const refArrowIcon = useRef();

  const handleMovie = () => {
    setTimeout(() => {
      setClickedMovie(true);
      setClickedTVshow(false);
      setMovieOrTV("movie");
    }, 2500);
    setTransitionMovie(true);
    setTransitionTV(false);
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

  const removeArrowIcon = () => {
    refArrowIcon.current.className = "heroImg__arrow--none";
  };

  useEffect(() => {
    let a = setTimeout(() => {
      refArrowIcon.current.className = "heroImg__arrow--none";
    }, 0);
    return () => clearTimeout(a);
  }, [arrowIconDisable]);

  const baseUrl = "https://api.themoviedb.org/3/";
  const myApiKey = "api_key=39b7c306441823329a6e5fa506a7906c";

  const getMovieGenre = async () => {
    const urlMovie = `${baseUrl}genre/movie/list?${myApiKey}`;

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
  ////////////
  const getPopularMovie = useCallback(async () => {
    const urlPopular = `${baseUrl}movie/popular?${myApiKey}&language=en-US&page=1`;

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
    const urlPopular = `${baseUrl}tv/top_rated?${myApiKey}&language=en-US&page=1`;

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

  return (
    <>
      <div className="heroImg">
        <a
          className={
            clickedMovie || clickedTVshow
              ? "heroImg__arrow"
              : "heroImg__arrow--none"
          }
          href={"#trend"}
          ref={refArrowIcon}
          onClick={removeArrowIcon}
        >
          <FaAngleDoubleDown className="heroImg__arrow__icon" />
        </a>
        <div
          className={
            !transitionMovie && !transitionTV
              ? "heroImg__title"
              : "heroImg__title--none"
          }
        >
          <p className="heroImg__welcome">
            <span>Welcome!</span>
            <br />
            <span>Do you prefer more TV Shows or Movies?</span>
          </p>
        </div>

        <div
          style={{
            backgroundImage: `linear-gradient(
              to right,
              rgba(200, 188, 21, 0.41),
              rgba(237, 226, 15, 0.43)
            ), url(https://image.tmdb.org/t/p/original${imgPopularTV.backdrop_path})`,
          }}
          className={`heroImg__left${
            transitionMovie ? "__transition-movie" : ""
          }${transitionTV ? "__transition-tv" : ""}`}
        >
          <div
            className={`heroImg__left${
              transitionMovie ? "__transition-movie" : ""
            }${transitionTV ? "__transition-tv" : ""}__tv-info`}
          >
            <h2 className="heroImg__left__name">
              {imgPopularTV.title || imgPopularTV.original_name}
            </h2>
            <p>
              <b>{imgPopularTV?.overview?.substring(0, 200)}</b>...
            </p>
            <a
              href={`/watch/?v=${imgPopularTV.id}`}
              target="_blank"
              rel="noreferrer"
              className="btnPrimary btnPrimary--red"
            >
              Watch Now
            </a>
          </div>
          <Link
            to={"/home/tv"}
            className={`heroImg__left${
              transitionMovie ? "__transition-movie" : ""
            }${transitionTV ? "__transition-tv" : ""}--btnHero btnPrimary`}
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
            transitionMovie ? "__transition-movie" : ""
          }${transitionTV ? "__transition-tv" : ""}`}
        >
          {" "}
          <div
            className={`heroImg__right${
              transitionMovie ? "__transition-movie" : ""
            }${transitionTV ? "__transition-tv" : ""}__movie-info`}
          >
            <h2 className="heroImg__right__name">
              {imgPopularMovie.title || imgPopularMovie.original_name}
            </h2>
            <p>
              <b>{imgPopularMovie?.overview?.substring(0, 200)}</b>...
            </p>
            <a
              href={`/watch/?v=${imgPopularMovie.id}`}
              target="_blank"
              rel="noreferrer"
              className="btnPrimary btnPrimary--red"
            >
              Watch Now
            </a>
          </div>
          <Link
            to={"/home/movies"}
            className={`heroImg__right${
              transitionMovie ? "__transition-movie" : ""
            }${transitionTV ? "__transition-tv" : ""}--btnHero btnPrimary`}
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
