import React, { Component, useState ,useMemo } from "react";

import { fetchMovies } from "../../actions";
import MovieItem from "../movie-item";

import { connect } from "react-redux";

import "./style.css";

const useSortableData = (movies, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...movies];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [movies, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { movies: sortedItems, requestSort, sortConfig };
};

const MovieList = (props) => {
  const {movies, requestSort, sortConfig } = useSortableData(props.movies);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div>
      <div className="contain">
        <button
          onClick={() => requestSort("title")}
          className={getClassNamesFor("title")}
          tabIndex="-1"
          name="search"
        >
          Sort by title
        </button>
      </div>
      <ul className="wrapper">
        {movies.map((movie) => {
          return (
            <li key={movie._id}>
              <MovieItem movie={movie} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

class MovieListContainer extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const { movies } = this.props;

    return <MovieList movies={movies} />;
  }
}

const mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { fetchMovies })(MovieListContainer);
