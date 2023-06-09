import React, { useState, createContext } from "react";
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
  const [chosenGenre, setChosenGenre] = useState("");
  const [arrowIconDisable, setArrowIconDisable] = useState(false);

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
        chosenGenre,
        setChosenGenre,
        arrowIconDisable,
        setArrowIconDisable,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
