import { getById, getAll, create, update, remove } from '../crud'
import { Movie } from '../../resources/movie/movie.model'


describe('crud controllers', () => {
  describe('getById', async () => {
    test('finds by movie id', async () => {
      expect.assertions(1)

      const movie = await Movie.create({
        title: 'movie',
        year: 1975,
        stars: 'George Clooney'
      })

      const req = {
        params: {
          id: movie._id
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data._id.toString()).toBe(list._id.toString())
        }
      }

      await getById(Movie)(req, res)
    })

    test('404 if no doc was found', async () => {
      expect.assertions(1)


      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await getById(Movie)(req, res)
    })
  })

  describe('getAll', () => {
    test('finds array of docs by movie', async () => {
      expect.assertions(4)


      await Movie.create([
        { title: 'list' }
      ])

      await getMany(List)(req, res)
    })
  })

  describe('create', () => {
    test('creates a new doc', async () => {
      expect.assertions(1)

      const body = {
        title: 'movie',
        year: 1975,
        stars: 'George Clooney'
      }

      const req = {
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(results.data.title).toBe(body.title)
        }
      }

      await create(Movie)(req, res)
    })

  })

  describe('update', () => {
    test('Update movie by Id', async () => {
      expect.assertions(2)

      const list = await Movie.create({ title: 'name' })
      const update = { title: 'hello' }

      const req = {
        params: { id: movie._id },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${list._id}`)
          expect(results.data.title).toBe(update.title)
        }
      }

      await update(Movie)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(1)



      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await update(Movie)(req, res)
    })
  })

  describe('remove', () => {
    test('Remove movie by Id', async () => {
      expect.assertions(1)

      const list = await Movie.create({ tilte: 'name' })

      const req = {
        params: { id: list._id },
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${list._id}`)
        }
      }

      await remove(Movie)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(1)


      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        end() {
          expect(true).toBe(true)
        }
      }

      await remove(Movie)(req, res)
    })
  })
})
