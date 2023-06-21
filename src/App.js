import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import MovieContext from "./context/MovieContext";
import axios from "axios";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import Playvideo from "./components/Playvideo/Playvideo";
import { routeConfig } from "./config/routeConfig";
import Register from "./pages/Register/Register";
import ViewMovie from "./pages/ViewMovie/ViewMovie";
import Home from "./pages/Home/Home";
import SearchedMovies from "./pages/SearchedMovies/SearchedMovies";
import MovieSection from "./pages/MovieSection/MovieSection";
import TVshowSection from "./pages/TVshowSection/TVshowSection";

function App() {
  const { auth, setAuth, userLogin, setUserLogin, logout } =
    useContext(MovieContext);
  const [sessionId, setSessionId] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  const [approve] = useSearchParams("");
  const approved = approve.get("approved");

  useEffect(() => {
    if (approved === "true") {
      setAuth(true);
    }
  }, [approved]);

  useEffect(() => {
    const handleAuth = () => {
      if (isMounted && !userLogin) {
        axios
          .post(
            "https://api.themoviedb.org/3/authentication/session/new?api_key=39b7c306441823329a6e5fa506a7906c",
            {
              request_token: JSON.parse(localStorage.getItem("tokenRequest")),
            }
          )
          .then((res) => {
            if (res && res.status === 200) {
              setUserLogin(true);
              setSessionId(res.data.session_id);
            }
          })
          .catch((err) => console.log(err));
      } else setIsMounted(true);
    };
    handleAuth();
  }, [auth]);

  useEffect(() => {
    if (isMounted) {
      axios
        .delete(
          `https://api.themoviedb.org/3/authentication/session?api_key=39b7c306441823329a6e5fa506a7906c&session_id=${sessionId}`
        )
        .then((res) => {
          setUserLogin(false);
          navigate("/");
        })
        .catch((err) => console.error(err));
    } else setIsMounted(true);
  }, [logout]);

  return (
    <div className="App">
      <Routes>
        {userLogin ? (
          <>
            <Route path={routeConfig.HOME.url} element={<Home />}>
              <Route path={routeConfig.MOVIES.url} element={<MovieSection />} />
              <Route path={routeConfig.TV.url} element={<TVshowSection />} />
            </Route>
            <Route path={routeConfig.LIST.url} element={<SearchedMovies />} />
            <Route
              path={routeConfig.OVERVIEW.url}
              element={<ViewMovie />}
            ></Route>
            <Route path={routeConfig.WATCH.url} element={<Playvideo />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          <>
            <Route path={routeConfig.REGISTER.url} element={<Register />} />
            <Route path="*" element={<Register />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
