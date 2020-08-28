import React from 'react';
import MovieListContainer from '../movie-list';
import MovieSearch from '../movie-search';


const HomePage = () => {
  return (
    <div>
       <MovieSearch/>
       <MovieListContainer /> 
    </div>
  );
};

export default HomePage;