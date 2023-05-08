import React from "react";
import Trending from "../../components/Banner/Trending";
import TopRated from "../../components/Banner/TopRated";
import Popular from "../../components/Banner/Popular";
import Action from "../../components/Banner/Action";
import Comedy from "../../components/Banner/Comedy";
import Documentary from "../../components/Banner/Documentary";
import Reality from "../../components/Banner/Reality";

const TVshowSection = () => {
  return (
    <div className="main">
      <h3 className="main main--center">You choose TV Series</h3>
      <Trending />
      <Popular />
      <TopRated />
      <Action />
      <Comedy />
      <Documentary />
      <Reality />
    </div>
  );
};

export default TVshowSection;
