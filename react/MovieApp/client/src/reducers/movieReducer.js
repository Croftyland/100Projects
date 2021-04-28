const initialState = {
  movies: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "MOVIE_ADDED":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };

    default:
      return state;
  }
};
