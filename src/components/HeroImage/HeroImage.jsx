import React, { useContext, useState } from "react";
import "./HeroImage.scss";
import randomIMG from "../../img/login-bckground-image.jpg";
import random2 from "../../img/BreakingBad.jpg";
import random3 from "../../img/MOVIZZ.jpg";
import MovieContext from "../../context/MovieContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";

const HeroImage = () => {
  const navigate = useNavigate();
  let slike = [random2, random3, randomIMG];
  const { setMovieOrTV, setClickedMovie, setClickedTVshow } =
    useContext(MovieContext);

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
