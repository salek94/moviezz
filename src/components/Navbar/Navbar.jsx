import React, { useRef, useState, useContext, useEffect } from "react";
import "../Navbar/Navbar.scss";
import MovieContext from "../../context/MovieContext";
import mainLogo from "../../img/logo.png";
import { FaUserCircle, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FavoriteMovie from "../FavoriteMovie/FavoriteMovie";

const Navbar = () => {
  const { userLogin, setLogout, favorite } = useContext(MovieContext);
  const [searchValue, setSearchValue] = useState("");
  const [showFavoriteMovie, setShowFavoriteMovie] = useState(false);
  const navigate = useNavigate();
  const inputSearch = useRef();

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const getSearchResults = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/list?search=${searchValue}`);
      inputSearch.current.value = "";
    }
  };

  const goToHome = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/list?search=${searchValue}`);
      inputSearch.current.value = "";
    }
  };

  const handleFavoriteMovie = () => {
    // setShowFavoriteMovie(!showFavoriteMovie);
    setShowFavoriteMovie(true);
    console.log(showFavoriteMovie);
  };
  // useEffect(() => {
  //   if (favorite.length > 0) setShowFavoriteMovie(true);
  //   else setShowFavoriteMovie(false);
  // }, [favorite]);

  return (
    <div className="nav-container">
      <div className="nav-flex">
        <div className="nav-flex__logo" onClick={goToHome}>
          <div>
            <img src={mainLogo} alt="" />
          </div>
          <h3>MOVIZZ</h3>
        </div>

        <div className="nav-flex__search">
          <input
            type="search"
            className="nav-flex__search__input"
            placeholder="Search for a movie, tv shows..."
            name="searchMovie"
            autoComplete="off"
            ref={inputSearch}
            onChange={handleSearchValue}
            onKeyDown={handleEnter}
          />

          <FaSearch className="searchIcon" onClick={getSearchResults} />

          {!userLogin ? (
            <span className="nav-flex__search__notLogin">Login</span>
          ) : (
            <div className="nav-flex__search__login">
              <span onClick={() => setLogout(true)}>
                <FaUserCircle />
              </span>
              <span
                className={
                  favorite.length === 0 ? "" : "nav-flex__search__favorite"
                }
              >
                <FaHeart onClick={handleFavoriteMovie} />
              </span>
            </div>
          )}
        </div>
        {favorite?.map((fav) => {
          return (
            <FavoriteMovie
              fav={fav}
              show={showFavoriteMovie}
              key={fav.id}
              onClickOutside={() => setShowFavoriteMovie(false)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
