import { Router } from 'express'
import controllers from './movie.controllers'


const router = Router()

// /api/movie
router
  .route('/')
  .get(controllers.getAll)
  .post(controllers.create);

router
    .route('/sort')
    .get(controllers.sortAll)

router
  .route('/find/:query')
    .get(controllers.searchByTitle)

// /api/movie/:id
router
  .route('/:id')
  .get(controllers.getById)
  .put(controllers.update)
  .delete(controllers.remove)

// /api/movie/upload
router
   .route('/upload')
   .post(controllers.uploadFile)

export default router
