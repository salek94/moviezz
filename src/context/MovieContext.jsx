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
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [movieGenres, setMovieGenres] = useState();
  const [viewMovieOrTv, setViewMovieOrTv] = useState();
  const [auth, setAuth] = useState(false);
  const [logout, setLogout] = useState(false);

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
        favoriteMovie,
        setFavoriteMovie,
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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
