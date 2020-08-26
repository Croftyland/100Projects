import React from 'react';
import MovieListContainer from '../movie-list';
import MovieSearch from '../movie-search';
import MovieSort from '../movie-sort'


const HomePage = () => {
  return (
    <div>
       <MovieSearch/>
       <MovieSort/>
       <MovieListContainer /> 
    </div>
  );
};

export default HomePage;