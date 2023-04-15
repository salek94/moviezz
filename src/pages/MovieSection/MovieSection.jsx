import React from 'react';
import Trending from '../../components/Banner/Trending';
import TopRated from '../../components/Banner/TopRated';
import Trailers from '../../components/Banner/Trailers';
import Popular from '../../components/Banner/Popular';


const MovieSection = () => {

  return (

    <div className="main-container">
        <Trending/>
        <Popular/>
        <Trailers/>
        <TopRated/>
    </div>
  

    // today, this week..
    // Upcoming, new..
  )
}

export default MovieSection