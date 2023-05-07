import React from "react";
import { useState, useContext } from "react";
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

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const getSearchResults = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/list?search=${searchValue}`);
    }
  };

  const goToHome = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  // NE ZNAM DA NAMESTIM ENTER BUTTON
  // const aaa = (e) => {
  //   e.preventDefault();
  //   if (e.key === "Enter") {
  //     navigate(`/list?search=${searchValue}`);
  //   }
  // };

  const handleFavoriteMovie = (e) => {
    if (!favorite) setShowFavoriteMovie(false);
    // setShowFavoriteMovie(!showFavoriteMovie);
    setShowFavoriteMovie(showFavoriteMovie ? false : true);
  };

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
            onChange={handleSearchValue}
            // onKeyDown={(e) => aaa(e)}
          />

          <FaSearch
            className="searchIcon"
            onClick={(e) => getSearchResults(e)}
          />

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
                onClick={handleFavoriteMovie}
              >
                <FaHeart />
              </span>
            </div>
          )}
        </div>
        {showFavoriteMovie &&
          favorite?.map((fav) => {
            return (
              <FavoriteMovie
                fav={fav}
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
