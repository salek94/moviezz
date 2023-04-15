import React, { useContext } from 'react'
import './Home.scss';
import HeroImage from '../../components/HeroImage/HeroImage';
import Navbar from '../../components/Navbar/Navbar';
import MovieSection from '../MovieSection/MovieSection';
import TVshowSection from '../TVshowSection/TVshowSection';
import MovieContext from '../../context/MovieContext';

const Home = () => {

  const {clickedMovie} = useContext(MovieContext)
  const {clickedTVshow} = useContext(MovieContext)

  return (
    <div>
        <Navbar/>
        <HeroImage/>
        {clickedMovie && <MovieSection/>}
        {clickedTVshow && <TVshowSection/>}
    
    </div>
  )
}

export default Home