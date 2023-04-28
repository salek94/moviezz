// import React, { useContext, useEffect } from "react";
// import MovieContext from "../../context/MovieContext";

// const GetGenre = async () => {
//   const { setMovieGenres } = useContext(MovieContext);
//   const urlMovie =
//     "https://api.themoviedb.org/3/genre/movie/list?api_key=39b7c306441823329a6e5fa506a7906c";

//   try {
//     const response = await fetch(urlMovie);
//     const responseJson = await response.json();

//     if (responseJson.genres) {
//       console.log(responseJson.genres);
//       setMovieGenres(responseJson.genres);
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   useEffect(() => {
//     GetGenre();
//   }, []);
// };

// export default GetGenre;
