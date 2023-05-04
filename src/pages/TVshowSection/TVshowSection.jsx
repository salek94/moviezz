import React from "react";
import Trending from "../../components/Banner/Trending";
import TopRated from "../../components/Banner/TopRated";
import Trailers from "../../components/Banner/Trailers";
import Popular from "../../components/Banner/Popular";
import Action from "../../components/Banner/Action";
import Animation from "../../components/Banner/Animation";
import Horror from "../../components/Banner/Horror";
import Comedy from "../../components/Banner/Comedy";

const TVshowSection = () => {
  return (
    <div className="main-container">
      <h3>ddwdwa</h3>
      <Trending />
      <Popular />
      {/* <Trailers/> */}
      <TopRated />
      <Action />
      <Animation />
      <Comedy />
      <Horror />
    </div>
  );
};

export default TVshowSection;
