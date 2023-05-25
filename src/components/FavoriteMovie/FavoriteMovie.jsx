import React, { useContext, useEffect, useRef } from "react";
import "./FavoriteMovie.scss";
import MovieContext from "../../context/MovieContext";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const FavoriteMovie = ({ fav, onClickOutside, show }) => {
  const { favorite, setFavorite } = useContext(MovieContext);
  const ref = useRef(null);

  const handleRemoveItem = (fav) => {
    let deleteItem = favorite.filter((item) => item.id !== fav.id);
    setFavorite(deleteItem);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       onClickOutside && onClickOutside();
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, [onClickOutside]);

  // if (!show) return null;

  return (
    <div className="favMenu" ref={ref} id={fav.id}>
      <span className="favMenu__img">
        <img src={`https://image.tmdb.org/t/p/original${fav.pic}`} alt="" />
      </span>
      <span className="favMenu__title">{fav.name}</span>
      <span className="favMenu__removeItem">
        <IoIosRemoveCircleOutline onClick={() => handleRemoveItem(fav)} />
      </span>
    </div>
  );
};

export default FavoriteMovie;
