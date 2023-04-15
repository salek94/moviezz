import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const MovieContext = createContext();


export const MovieProvider = ({children}) => {

    const [movie, setMovie] = useState([]);
    const [userLogin, setUserLogin] = useState(true);
    const [clickedMovie, setClickedMovie] = useState(false);
    const [clickedTVshow, setClickedTVshow] = useState(false);
    const [movieOrTV, setMovieOrTV] = useState('movie')

  return (
    <MovieContext.Provider value={{movie, setMovie,
     userLogin, setUserLogin,
     clickedMovie,setClickedMovie,
     clickedTVshow, setClickedTVshow,
     movieOrTV, setMovieOrTV}}>
        {children}
    </MovieContext.Provider>
  )
}

export default MovieContext