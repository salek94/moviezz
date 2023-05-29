import React, { lazy } from "react";
const Trending = lazy(() => import("../../components/Banner/Trending"));
const TopRated = lazy(() => import("../../components/Banner/TopRated"));
const Popular = lazy(() => import("../../components/Banner/Popular"));
const Action = lazy(() => import("../../components/Banner/Action"));
const Comedy = lazy(() => import("../../components/Banner/Comedy"));
const Documentary = lazy(() => import("../../components/Banner/Documentary"));
const Reality = lazy(() => import("../../components/Banner/Reality"));

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
