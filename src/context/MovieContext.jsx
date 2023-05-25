import React from "react";
import { useState } from "react";
import { createContext } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);
  const [userLogin, setUserLogin] = useState(false);
  const [clickedMovie, setClickedMovie] = useState(false);
  const [clickedTVshow, setClickedTVshow] = useState(false);
  const [movieOrTV, setMovieOrTV] = useState("movie");
  const [favorite, setFavorite] = useState([]);
  const [movieGenres, setMovieGenres] = useState();
  const [viewMovieOrTv, setViewMovieOrTv] = useState();
  const [auth, setAuth] = useState(false);
  const [logout, setLogout] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  return (
    <MovieContext.Provider
      value={{
        movie,
        setMovie,
        userLogin,
        setUserLogin,
        clickedMovie,
        setClickedMovie,
        clickedTVshow,
        setClickedTVshow,
        favorite,
        setFavorite,
        movieOrTV,
        setMovieOrTV,
        movieGenres,
        setMovieGenres,
        viewMovieOrTv,
        setViewMovieOrTv,
        auth,
        setAuth,
        logout,
        setLogout,
        videoOn,
        setVideoOn,
        videoKey,
        setVideoKey,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
