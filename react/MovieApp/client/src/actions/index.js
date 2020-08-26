
import api from '../apis/jsonPlaceholder';

export const fetchMovies =  () => async dispatch => {
   const res = await api.getAllMovies();
   dispatch({type: 'FETCH_MOVIE', payload: res.data.data})
};

export const onSort = () => async dispatch => {
   const res = await api.sortAllMovies()
   dispatch({type: 'SORT_MOVIE_BY_TITLE', payload: res.data.data})
}

 export const onSearch = (title) => async dispatch => {
    const res = await api.getMovieByTitle(title)
    dispatch({type: 'GET_MOVIE_BY_TITLE', payload: res.data.data})
 }

export const onDelete = (_id) => async dispatch => {
   await api.deleteMovieById(_id)
   dispatch({type: 'MOVIE_REMOVED', payload: _id})
}

export const onSubmitOne = (values) => async dispatch => {
   const res = await api.insertMovie(values)
   dispatch({type: 'MOVIE_ADDED', payload: res.data.data})
}

export const onUploadMovies = (file) => async dispatch => {
   const res = await api.uploadMovie(file)
	dispatch({type: 'MOVIES_UPLOADED',payload: res.data.data});
};