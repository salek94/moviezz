import React, { lazy } from "react";
const Trending = lazy(() => import("../../components/Banner/Trending"));
const TopRated = lazy(() => import("../../components/Banner/TopRated"));
const Popular = lazy(() => import("../../components/Banner/Popular"));
const Action = lazy(() => import("../../components/Banner/Action"));
const Animation = lazy(() => import("../../components/Banner/Animation"));
const Horror = lazy(() => import("../../components/Banner/Horror"));
const Comedy = lazy(() => import("../../components/Banner/Comedy"));

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
