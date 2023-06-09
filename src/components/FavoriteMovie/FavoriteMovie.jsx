import React, { useContext, useRef } from "react";
import "./FavoriteMovie.scss";
import MovieContext from "../../context/MovieContext";
import { IoIosRemoveCircleOutline, IoIosPlay } from "react-icons/io";

const FavoriteMovie = ({ fav, onClickOutside, show }) => {
  const { favorite, setFavorite } = useContext(MovieContext);
  const ref = useRef(null);

  const handleRemoveItem = (fav) => {
    let deleteItem = favorite.filter((item) => item.id !== fav.id);
    setFavorite(deleteItem);
  };
  console.log(fav);

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
    <div className="favMenu" ref={ref}>
      <span className="favMenu__img">
        <img src={`https://image.tmdb.org/t/p/original${fav.pic}`} alt="" />
      </span>
      <span className="favMenu__title">
        {fav.name === undefined ? "" : fav.name.substring(0, 20)}
      </span>
      <a
        href={`/watch/?v=${fav.id}`}
        target="_blank"
        rel="noreferrer"
        className="favMenu__watch"
      >
        <IoIosPlay />
      </a>
      <span className="favMenu__removeItem">
        <IoIosRemoveCircleOutline onClick={() => handleRemoveItem(fav)} />
      </span>
    </div>
  );
};

export default FavoriteMovie;
