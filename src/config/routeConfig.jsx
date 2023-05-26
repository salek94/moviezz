export const routeConfig = {
  HOME: {
    url: "/home",
  },
  REGISTER: {
    url: "/",
  },
  MOVIES: {
    url: "movies",
  },
  TV: {
    url: "tv",
  },
  LIST: {
    url: "/list",
  },
  OVERVIEW: {
    url: "/view/:id",
    realUrl: (id) => `/view/${id}`,
  },
  WATCH: {
    url: "/watch",
  },
};
