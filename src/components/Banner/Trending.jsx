import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { settings } from "../SliderBanner/settings";
import SliderBanner from "../SliderBanner/SliderBanner";

const Trending = () => {
  const [moviesTrending, setMoviesTrending] = useState("");
  const [period, setPeriod] = useState("day");
  const [today, setToday] = useState(true);

  const getMovieTrending = async (period) => {
    const baseUrl = "https://api.themoviedb.org/3/";
    const urlTrending = `${baseUrl}trending/all/${period}?api_key=39b7c306441823329a6e5fa506a7906c`;

    try {
      const response = await fetch(urlTrending);
      const responseJson = await response.json();

      if (responseJson) {
        // console.log(responseJson.results);
        setMoviesTrending(responseJson.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieTrending(period);
  }, [period]);

  const handlePeriodDay = () => {
    setToday(true);
    setPeriod("day");
  };

  const handlePeriodWeek = () => {
    setToday(false);
    setPeriod("week");
  };

  return (
    <div className="container">
      <div className="wrapper" id="trend">
        <h3>Trending</h3>
        <div className="wrapper__period">
          <span
            className={`${
              today && "wrapper__period--active"
            } wrapper__period__box`}
            onClick={handlePeriodDay}
          >
            Today
          </span>
          <span
            className={`${
              !today && "wrapper__period--active"
            } wrapper__period__box`}
            onClick={handlePeriodWeek}
          >
            This Week
          </span>
        </div>
      </div>
      <Slider {...settings}>
        {moviesTrending &&
          moviesTrending.map((movie) => {
            return <SliderBanner movie={movie} key={movie.id} />;
          })}
      </Slider>
    </div>
  );
};

export default Trending;
