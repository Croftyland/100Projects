const initialState = {
	movies: [],
	error: null
}

export default (state= initialState, action) => {

	switch (action.type) {

		 case 'FETCH_MOVIE':
		  return {
			movies: action.payload,
		};
		case 'FETCH_MOVIE_FAILURE':
		return {
		  movies: [],
		  error: action.payload
		};	
		case 'SORT_MOVIE_BY_TITLE':
		  return {
			...state,  
			movies: action.payload,
			};
		  case 'MOVIE_ADDED':
            return {
                ...state,
                movies: [...state.movies, action.payload]
				};
		case 'MOVIES_UPLOADED':
			return {
				...state,
				movies: [...action.payload, ...state.movies],		
			};		
           
        case 'MOVIE_REMOVED':
             return {
                ...state,
                movies: state.movies.filter((movie) => (movie._id !== action.payload))
				};   
		case 'GET_MOVIE_BY_TITLE':
				return {
					...state,
					movies: action.payload
				};	

		  default:
            return state;
	}
};