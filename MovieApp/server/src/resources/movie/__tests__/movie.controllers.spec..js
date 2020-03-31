import controllers from '../movie.controllers'
import { isFunction } from 'lodash'

describe('movie controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getById',
      'getAll',
      'create',
      'remove',
      'updated'
    ]

    crudMethods.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    )
  })
})
