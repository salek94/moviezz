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
      navigate(`/list/?search=${searchValue}`);
      inputSearch.current.value = "";
    }
  };

  const handleFavoriteMovie = () => {
    setShowFavoriteMovie(!showFavoriteMovie);
    // setShowFavoriteMovie(true);
    console.log(showFavoriteMovie);
  };
  // useEffect(() => {
  //   if (favorite.length > 0) setShowFavoriteMovie(true);
  //   else setShowFavoriteMovie(false);
  // }, [favorite]);

  return (
    <div className="nav-container">
      <div className="navbar">
        <div className="navbar__logo" onClick={goToHome}>
          <div>
            <img src={mainLogo} alt="" />
          </div>
          <h3>MOVIZZ</h3>
        </div>

        <div className="navbar__search">
          <input
            type="search"
            className="navbar__input"
            // className="navbar__search__input"
            placeholder="Search for a movie, tv shows..."
            name="searchMovie"
            autoComplete="off"
            ref={inputSearch}
            onChange={handleSearchValue}
            onKeyDown={handleEnter}
          />

          <FaSearch className="navbar__searchIcon" onClick={getSearchResults} />

          {!userLogin ? (
            <span className="navbar__notLogin">Login</span>
          ) : (
            <div className="navbar__login">
              <span
                className="navbar__login--icon"
                onClick={() => setLogout(true)}
              >
                <FaUserCircle />
              </span>
              <span
                className={
                  favorite.length === 0
                    ? "navbar__login--icon"
                    : "navbar__login--icon navbar__favorite-length"
                }
              >
                <FaHeart onClick={handleFavoriteMovie} />
              </span>
            </div>
          )}
        </div>
        {showFavoriteMovie && (
          <div className="navbar__favorite-wrapper">
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
