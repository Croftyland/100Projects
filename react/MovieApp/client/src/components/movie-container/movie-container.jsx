import React, { useState, useEffect } from "react";
import MovieItem from "../movie-item";
import api from "../../apis/jsonPlaceholder";

import "./style.css";

const MovieListContainer = () => {
  const [movies, setMovies] = useState([]);
  const [isDesc, setDesc] = useState(true);
  const [search, setSearch] = useState(``);

  useEffect(() => {
    async function fetchMovies() {
      const result = await api.getAllMovies();
      setMovies(result.data.data);
    }
    fetchMovies();
  }, []);

  const deleteMovie = async (id) => {
    const response = await api.deleteMovieById(id);
    if (response.status === 200) {
      const filteredMovies = movies.filter((item) => item._id !== id);
      setMovies(filteredMovies);
    } else console.log(response.message);
  };

  const onSorted = () => {
    let sortableItems;
    if (isDesc) {
      sortableItems = [...movies].sort((a, b) => (a.title > b.title ? 1 : -1));
    } else {
      sortableItems = [...movies].sort((a, b) => (a.title < b.title ? 1 : -1));
    }
    setMovies(sortableItems);
    setDesc(!isDesc);
  };

  return (
    <div className="container">
      <h1>Find your movie of your interest</h1>
      <div className="contain">
        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Write something"
            className="search__input"
          />
        </div>
        <button onClick={onSorted}>Sort by title</button>
      </div>

      <ul className="wrapper">
        {movies
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((movie) => {
            return (
              <li key={movie._id}>
                <MovieItem movie={movie} onDelete={deleteMovie} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default MovieListContainer;
