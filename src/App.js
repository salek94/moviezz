import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register/Register";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewMovie from "./pages/viewMovie/ViewMovie";
import Home from "./pages/Home/Home";
import SearchedMovies from "./pages/SearchedMovies/SearchedMovies";
import MovieSection from "./pages/MovieSection/MovieSection";
import TVshowSection from "./pages/TVshowSection/TVshowSection";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Register />}></Route>
            <Route path="/home" element={<Home />}>
              <Route path="movies" element={<MovieSection />} />
              <Route path="tv" element={<TVshowSection />} />
            </Route>
            <Route path="/list" element={<SearchedMovies />}></Route>
            <Route path="/view">
              <Route path=":id" element={<ViewMovie />} />
            </Route>
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
