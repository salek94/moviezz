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

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Register />}></Route> */}
        {userLogin && JSON.parse(localStorage?.getItem("tokenSession")) ? (
          <>
            <Route path="/home" element={<Home />}>
              <Route path="movies" element={<MovieSection />} />
              <Route path="tv" element={<TVshowSection />} />
            </Route>
            <Route path="/list" element={<SearchedMovies />}></Route>
            <Route path="/view">
              <Route path=":id" element={<ViewMovie />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/watch">
              <Route path=":id" element={<Playvideo />} />
            </Route>
            <Route path="*" element={<Register />} />
            {/* <Route path="*" element={<NotFound/>} /> */}
            <Route path="/" element={<Register />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
