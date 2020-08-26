import React, { Component } from 'react';

import { fetchMovies } from '../../actions';
import MovieItem from '../movie-item';

import { connect } from 'react-redux';

import './style.css';

const MovieList = ({ movies }) => {
  return (
    <ul className="wrapper">
      {
        movies.map((movie) => {
          return (
            <li key = {movie._id}>
              <MovieItem
                movie={movie}
                />
            </li>
          );
        })
      }
    </ul>
  );
};

class MovieListContainer extends Component {

  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const { movies } = this.props;

    return <MovieList movies={movies}/>;
  }
}

const mapStateToProps = (state) => {
	return {movies: state.movies}
}

export default connect(mapStateToProps,{ fetchMovies}) (MovieListContainer);