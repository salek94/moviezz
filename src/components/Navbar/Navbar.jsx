import React from 'react';
import { useState, useContext } from 'react';
import '../Navbar/Navbar.scss';
import MovieContext from '../../context/MovieContext';
import mainLogo from '../../img/logo.png';
import {FaUserCircle, FaSearch, FaHeart} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const {userLogin} = useContext(MovieContext);
  const [searchValue, setSearchValue] = useState("");
  
  const navigate = useNavigate();


  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  }

  const getSearchResults = (e) => {
    e.preventDefault();
    console.log(e);
   // e.key === 'Enter' naci za enter dugme
    if(searchValue || (e.key === 'Enter')){
      navigate(`/list?search=${searchValue}`);
    }
    
  }

  const goToHome = e => {
    e.preventDefault();
    navigate('/home');
  }

  return (
    
    <div className='nav__container nav__background'> 
        <div className="nav__flex">
          <div className='nav__flex__logo' onClick={goToHome} >
            <div>
            <img src={mainLogo} alt=""/>
            </div>
            <h3 className='nav__flex__logo--animation'>MOVIZZ</h3>
          </div>

          <div className='nav__flex__search'>
            <input 
            type="search" 
            className='nav__flex__search__input' 
            placeholder='Search for a movie, tv show...' 
            name='searchMovie' 
            autoComplete='off' 
            onChange={handleSearchValue}/>

            <FaSearch className='searchIcon' onClick={(e)=>getSearchResults(e)}/>

           {!userLogin ? 

            <span className='nav__flex__search__notLogin'>Login</span>   
            : 
            <div className="nav__flex__search__login">
              <span><FaUserCircle/></span>
              <span><FaHeart/></span>
            </div>
            }
          </div>
        </div>
      
    </div>
    
  )
}

export default Navbar