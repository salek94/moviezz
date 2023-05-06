import React, { useContext, useState } from "react";
import "./FavoriteMovie.scss";
import MovieContext from "../../context/MovieContext";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const FavoriteMovie = ({ fav }) => {
  const { favoriteMovie } = useContext(MovieContext);
  const [flag, setFlag] = useState(false);
  console.log(favoriteMovie);

  const handleRemoveItem = (fav) => {
    favoriteMovie.splice(fav.id, 1);
    setFlag(!flag);
  };

  return (
    <>
      <div className="favMenu">
        <span className="favMenu__img">
          <img src={`https://image.tmdb.org/t/p/original${fav.pic}`} alt="" />
        </span>
        <span className="favMenu__title">{fav.name}</span>
        <span className="favMenu__removeItem">
          <IoIosRemoveCircleOutline onClick={handleRemoveItem} />
        </span>
      </div>
      {/* <div className="favMenu">
        <h3>No added Movie or TV Shows</h3>
      </div> */}
    </>
  );
};

export default FavoriteMovie;
