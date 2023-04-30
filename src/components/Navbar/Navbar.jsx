import React, { useEffect } from "react";
import { useState, useContext } from "react";
import "../Navbar/Navbar.scss";
import MovieContext from "../../context/MovieContext";
import mainLogo from "../../img/logo.png";
import { FaUserCircle, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { userLogin, setUserLogin, setLogout } = useContext(MovieContext);
  const [searchValue, setSearchValue] = useState("");

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

  // NE ZNAM DA NAMESTIM ENTER BUTTON
  // const aaa = (e) => {
  //   e.preventDefault();
  //   if (e.key === "Enter") {
  //     navigate(`/list?search=${searchValue}`);
  //   }
  // };

  const goToHome = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  // const goLogout = () => {
  //   if (flag) {
  //     axios
  //       .delete(
  //         "https://api.themoviedb.org/3/authentication/session?api_key=39b7c306441823329a6e5fa506a7906c",
  //         {
  //           session_id: JSON.parse(localStorage.getItem("tokenSession")),
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } else console.log("nije dobro");
  //   setUserLogin(false);
  //   navigate("/");
  // };
  // useEffect(() => {
  //   goLogout();
  // }, [flag]);
  return (
    <div className="nav__container nav__background">
      <div className="nav__flex">
        <div className="nav__flex__logo" onClick={goToHome}>
          <div>
            <img src={mainLogo} alt="" />
          </div>
          <h3 className="nav__flex__logo--animation">MOVIZZ</h3>
        </div>

        <div className="nav__flex__search">
          <input
            type="search"
            className="nav__flex__search__input"
            placeholder="Search for a movie, tv show..."
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
            <span className="nav__flex__search__notLogin">Login</span>
          ) : (
            <div className="nav__flex__search__login">
              <span onClick={() => setLogout(true)}>
                <FaUserCircle />
              </span>
              <span>
                <FaHeart />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
