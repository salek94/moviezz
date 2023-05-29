import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/features/loader/Loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <MovieProvider>
          <App />
        </MovieProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
