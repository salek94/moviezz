import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register/Register";
import MovieContext from "./context/MovieContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import ViewMovie from "./pages/ViewMovie/ViewMovie";
import Home from "./pages/Home/Home";
import SearchedMovies from "./pages/SearchedMovies/SearchedMovies";
import MovieSection from "./pages/MovieSection/MovieSection";
import TVshowSection from "./pages/TVshowSection/TVshowSection";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Playvideo from "./components/Playvideo/Playvideo";
import { routeConfig } from "./config/routeConfig";

function App() {
  const { auth, setAuth, userLogin, setUserLogin, logout } =
    useContext(MovieContext);
  const navigate = useNavigate();
  const [approve] = useSearchParams("");
  const approved = approve.get("approved");
  console.log(userLogin);

  useEffect(() => {
    if (approved == "true") {
      setAuth(true);
    }
  }, [approved]);

  useEffect(() => {
    const handleAuth = () => {
      if (auth) {
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
              localStorage.setItem(
                "tokenSession",
                JSON.stringify(res.data.session_id)
              );
              console.log(res.data);
              console.log(res.data.session_id);
            }
          });
      }
    };
    handleAuth();
  }, [auth]);

  useEffect(() => {
    const goLogout = () => {
      const sessionId = JSON.parse(localStorage.getItem("tokenSession"));
      if (logout) {
        axios
          .delete(
            `https://api.themoviedb.org/3/authentication/session?api_key=39b7c306441823329a6e5fa506a7906c&session_id=${sessionId}`
          )
          .then((res) => {
            if (res && res.status === 200) {
              console.log(res.data);
              setUserLogin(false);
              // localStorage.removeItem("tokenSession");
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      }
    };
    goLogout();
  }, [logout]);

  //todo kada se logout da mu ostane favorite kad se opet login
  //todo namestiti login formu i proveriti userLogin

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Register />}></Route> */}
        {userLogin && JSON.parse(localStorage?.getItem("tokenSession")) ? (
          <>
            <Route path={routeConfig.HOME.url} element={<Home />}>
              <Route path={routeConfig.MOVIES.url} element={<MovieSection />} />
              <Route path={routeConfig.TV.url} element={<TVshowSection />} />
            </Route>
            <Route path={routeConfig.LIST.url} element={<SearchedMovies />} />
            <Route path={routeConfig.OVERVIEW.url} element={<ViewMovie />}>
              {/* <Route path=":id" element={<ViewMovie />} /> */}
            </Route>
          </>
        ) : (
          <>
            <Route path={routeConfig.WATCH.url} element={<Playvideo />} />
            <Route path="*" element={<Register />} />
            {/* <Route path="*" element={<NotFound/>} /> */}
            <Route path={routeConfig.REGISTER.url} element={<Register />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
