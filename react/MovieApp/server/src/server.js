import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import { connect } from './utils/db'

import movieRouter from './resources/movie/movie.router'


export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(fileUpload());
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/movie', movieRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
