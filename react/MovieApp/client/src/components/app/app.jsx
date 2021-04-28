import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { UploadMovies } from "../movie-pages";
import { AddMoviePage } from "../movie-pages";
import { HomePage } from "../movie-pages";

import "./style.css";

const App = () => {
  return (
    <div>
      <div className="movie-nav-container">
        <ul className="movie-nav">
          <input
            type="checkbox"
            id="movie-menu"
            className="movie-menu-toggle"
            name="movie-menu-toggle"
          />
          <div className="bg-change"></div>
          <li className="movie-li movie-li3 movie-li-last">
            <Link
              to={{
                pathname: "/upload",
              }}
            >
              <span className="fa fa-arrow-circle-o-up"></span>
            </Link>
          </li>
          <li className="movie-li movie-li2">
            <Link
              to={{
                pathname: "/add-movie",
                state: { modal: true },
              }}
            >
              <span className="fa fa-ticket"></span>
            </Link>
          </li>
          <li className="movie-li movie-li1 movie-li-first">
            <Link
              to={{
                pathname: "/",
              }}
            >
              <span className="fa fa-fort-awesome"></span>
            </Link>
          </li>
          <li className="movie-main">
            <a>
              <label className="movie-menu-toggle-lbl" htmlFor="movie-menu">
                <span className="fa fa-plus"></span>
              </label>
            </a>
          </li>
        </ul>
      </div>

      <>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/upload" component={UploadMovies} />
          <Route path="/add-movie" component={AddMoviePage} />
        </Switch>
      </>
    </div>
  );
};

export default App;
