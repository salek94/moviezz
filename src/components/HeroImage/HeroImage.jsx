import React, { useContext, useState, useEffect, useMemo } from "react";
import "./HeroImage.scss";
import randomIMG from "../../img/login-bckground-image.jpg";
import random2 from "../../img/BreakingBad.jpg";
import random3 from "../../img/MOVIZZ.jpg";
import MovieContext from "../../context/MovieContext";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { logDOM } from "@testing-library/react";

const HeroImage = () => {
  let slike = [random2, random3, randomIMG];
  const {
    movieGenres,
    setMovieOrTV,
    setClickedMovie,
    setClickedTVshow,
    setMovieGenres,
  } = useContext(MovieContext);

  const [transitionMovie, setTransitionMovie] = useState(false);
  const [transitionTV, setTransitionTV] = useState(false);

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
        const allGenres = responseJson.genres;
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

  useEffect(() => {
    const getMovieReview = async () => {
      const urlMovie =
        "https://api.themoviedb.org/3/movie/312221/keywords?api_key=39b7c306441823329a6e5fa506a7906c&language=en-US&page=1";
      // keywords reviews
      try {
        const response = await fetch(urlMovie);
        const responseJson = await response.json();

        if (responseJson.results) {
          console.log(responseJson.results);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMovieReview();
  }, []);

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
        <div className="heroImg__title">
          <h2>
            <b>
              Welcome.
              <br />
              Millions of movies, TV shows and people to explore now.
            </b>
          </h2>
          <a href={"#trend"}>
            <FaArrowDown />
          </a>
          <button onClick={backTransition}>go back</button>
        </div>
        <div
          className={`heroImg__left${transitionMovie ? "1" : ""}${
            transitionTV ? "2" : ""
          }`}
        >
          <Link
            to={"/home/tv"}
            // className="heroImg__left__btnHero btnPrimary"
            className={`heroImg__left${transitionMovie ? "1" : ""}${
              transitionTV ? "2" : ""
            }__btnHero btnPrimary`}
            onClick={handleTVshow}
          >
            TV Shows
          </Link>
        </div>
        <div
          className={`heroImg__right${transitionMovie ? "1" : ""}${
            transitionTV ? "2" : ""
          }`}
        >
          <Link
            to={"/home/movies"}
            className={`heroImg__right${transitionMovie ? "1" : ""}${
              transitionTV ? "2" : ""
            }__btnHero btnPrimary`}
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
