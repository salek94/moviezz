import React, { useContext } from "react";
import "./HeroImage.scss";
import randomIMG from "../../img/login-bckground-image.jpg";
import random2 from "../../img/BreakingBad.jpg";
import random3 from "../../img/MOVIZZ.jpg";
import MovieContext from "../../context/MovieContext";
import { Link } from "react-router-dom";

const HeroImage = () => {
  let slike = [random2, random3, randomIMG];
  const { setMovieOrTV, setClickedMovie, setClickedTVshow } =
    useContext(MovieContext);

  const handleMovie = () => {
    setClickedMovie(true);
    setClickedTVshow(false);
    setMovieOrTV("movie");
  };

  const handleTVshow = () => {
    setClickedTVshow(true);
    setClickedMovie(false);
    setMovieOrTV("tv");
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
        </div>
        <div className="heroImg__left">
          <Link
            to={"/home/tv"}
            className="heroImg__left__btnHero btnPrimary"
            onClick={handleTVshow}
          >
            TV Shows
          </Link>
        </div>
        <div className="heroImg__right">
          <Link
            to={"/home/movies"}
            className="heroImg__right__btnHero btnPrimary"
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
