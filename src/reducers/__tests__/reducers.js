import { currentUserReducer } from '../currentUserReducer'
import { errorReducer } from '../errorReducer'
import {
  trainingDataReducer,
  projectsReducer,
  ascentsReducer,
  milestonesReducer,
  journalReducer,
  disciplineReducer,
  currentProjectReduce
} from '../userDataReducers'

describe('reducers', () => {
  describe('currentUserReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = {}

      const result = currentUserReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return a user when one is given', () => {
      const action = {
        type: 'SET_USER',
        user: { name: 'Human', email: 'human@earth.com' }
      }
      const expected = { name: 'Human', email: 'human@earth.com' }

      const result = currentUserReducer(undefined, action)

      expect(result).toEqual(expected)
    })

    it('should return an empty user object when type is LOGOUT_USER', () => {
      const expected = {}
      const action = { type: 'LOGOUT_USER' }

      const result = currentUserReducer({ name: 'Human', email: 'human@earth.com' }, action)

      expect(result).toEqual(expected)
    })
  })

  describe('errorReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = ''

      const result = errorReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return an error message if one is given', () => {
      const action = {
        type: 'SET_ERROR',
        error: 'Oh no!'
      }
      const expected = 'Oh no!'

      const result = errorReducer(undefined, action)

      expect(result).toEqual(expected)
    })

    it('should clear the error message when type is CLEAR_ERROR', () => {
      const expected = ''
      const action = { type: 'CLEAR_ERROR' }

      const result = errorReducer('ERROR!', action)

      expect(result).toEqual(expected)
    })
  })
})