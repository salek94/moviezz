import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./FavoriteMovie.scss";
import MovieContext from "../../context/MovieContext";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const FavoriteMovie = ({ fav, show }) => {
  const { favorite } = useContext(MovieContext);
  const [flag, setFlag] = useState(false);
  const ref = useRef(null);
  const handleRemoveItem = (fav) => {
    favorite.splice(fav.id, 1);
    setFlag(flag ? false : true);
  };

  const onClickOutside = useCallback(() => {
    show(false);
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        console.log(ref.current);
        console.log(event.target);
      } else if (ref.current.contains(event.target)) {
        console.log("istoo");
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <>
      <div className="favMenu" ref={ref}>
        <span className="favMenu__img">
          <img src={`https://image.tmdb.org/t/p/original${fav.pic}`} alt="" />
        </span>
        <span className="favMenu__title">{fav.name}</span>
        <span className="favMenu__removeItem">
          <IoIosRemoveCircleOutline onClick={handleRemoveItem} />
        </span>
      </div>
    </>
  );
};

export default FavoriteMovie;
