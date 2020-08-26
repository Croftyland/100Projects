import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const getAllMovies = () => api.get(`/movie`)
export const sortAllMovies = () => api.get(`/movie/sort`)

export const insertMovie = payload => api.post(`/movie`, payload)
export const uploadMovie = payload => api.post(`/movie/upload`, payload)

export const deleteMovieById = (_id) => api.delete(`/movie/${_id}`)
export const getMovieByTitle = title => api.get(`/movie/find/${title}`)

const apis = {
    insertMovie,
    uploadMovie,
    getAllMovies,
    deleteMovieById,
    getMovieByTitle,
    sortAllMovies,
}

export default apis