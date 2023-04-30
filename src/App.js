import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register/Register";
import MovieContext from "./context/MovieContext";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ViewMovie from "./pages/viewMovie/ViewMovie";
import Home from "./pages/Home/Home";
import SearchedMovies from "./pages/SearchedMovies/SearchedMovies";
import MovieSection from "./pages/MovieSection/MovieSection";
import TVshowSection from "./pages/TVshowSection/TVshowSection";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect } from "react";
import axios from "axios";

function App() {
  const { auth, userLogin, setUserLogin, logout } = useContext(MovieContext);
  const navigate = useNavigate();
  console.log(userLogin);
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
              localStorage.removeItem("tokenSession");
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
      {/* <BrowserRouter> */}
      <Routes>
        {/* <Route path="/" element={<Register />}></Route> */}
        {userLogin ? (
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
            <Route path="*" element={<Register />} />
            {/* <Route path="*" element={<NotFound/>} /> */}
            <Route path="/" element={<Register />}></Route>
          </>
        )}
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
