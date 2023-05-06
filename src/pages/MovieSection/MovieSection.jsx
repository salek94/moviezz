import React from "react";
import Trending from "../../components/Banner/Trending";
import TopRated from "../../components/Banner/TopRated";
import Popular from "../../components/Banner/Popular";
import Action from "../../components/Banner/Action";
import Animation from "../../components/Banner/Animation";
import Horror from "../../components/Banner/Horror";
import Comedy from "../../components/Banner/Comedy";

const MovieSection = () => {
  return (
    <div className="main">
      <h3 className="main main--center">You choose Movies</h3>
      <Trending />
      <Popular />
      <TopRated />
      <Action />
      <Animation />
      <Comedy />
      <Horror />
    </div>
  );
};

export default MovieSection;
