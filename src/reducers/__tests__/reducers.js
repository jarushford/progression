import { currentUserReducer } from '../currentUserReducer'
import { errorReducer } from '../errorReducer'
import {
  trainingDataReducer,
  projectsReducer,
  ascentsReducer,
  milestonesReducer,
  journalReducer,
  disciplineReducer,
  currentProjectReducer
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

  describe('trainingDataReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = {}

      const result = trainingDataReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return workouts', () => {
      const action = {
        type: 'GET_TRAINING',
        data: {
          '12/23/43': { type: 'core', description: 'do stuff!'}
        }
      }
      const expected = {
        '12/23/43': { type: 'core', description: 'do stuff!'}
      }

      const result = trainingDataReducer(undefined, action)

      expect(result).toEqual(expected)
    })

    it('should clear workouts when type is CLEAR_WORKOUTS', () => {
      const expected = {}
      const action = { type: 'CLEAR_WORKOUTS' }

      const result = trainingDataReducer({}, action)

      expect(result).toEqual(expected)
    })

    it('should toggle workouts as completed', () => {
      const action = {
        type: 'TOGGLE_COMPLETE',
        key: '12/12/12'
      }
      const state = {
        2: { description: 'do stuff', completed: false, workout_date: '12/12/12' },
        1: { description: 'do other stuff', completed: false, workout_date: '12/14/14' }
      }
      const expected = {
        2: { description: 'do stuff', completed: true, workout_date: '12/12/12' },
        1: { description: 'do other stuff', completed: false, workout_date: '12/14/14' }
      }

      const result = trainingDataReducer(state, action)

      expect(result).toEqual(expected)
    })
  })

  describe('projectsReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = []

      const result = projectsReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return projects when type is GET_PROJECTS', () => {
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = {
        type: 'GET_PROJECTS',
        data
      }

      const result = projectsReducer(undefined, action)

      expect(result).toEqual(data)
    })

    it('should clear projects when type is CLEAR_PROJECTS', () => {
      const expected = []
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = { type: 'CLEAR_PROJECTS' }

      const result = projectsReducer(data, action)

      expect(result).toEqual(expected)
    })
  })

  describe('ascentsReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = []

      const result = ascentsReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return ascents when type is GET_ASCENTS', () => {
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = {
        type: 'GET_ASCENTS',
        data
      }

      const result = ascentsReducer(undefined, action)

      expect(result).toEqual(data)
    })

    it('should clear ascents when type is CLEAR_ASCENTS', () => {
      const expected = []
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = { type: 'CLEAR_ASCENTS' }

      const result = ascentsReducer(data, action)

      expect(result).toEqual(expected)
    })
  })

  describe('milestonesReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = []

      const result = milestonesReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return milestones when type is GET_MILESTONES', () => {
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = {
        type: 'GET_MILESTONES',
        data
      }

      const result = milestonesReducer(undefined, action)

      expect(result).toEqual(data)
    })

    it('should clear milestones when type is CLEAR_MILESTONES', () => {
      const expected = []
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = { type: 'CLEAR_MILESTONES' }

      const result = milestonesReducer(data, action)

      expect(result).toEqual(expected)
    })
  })

  describe('journalReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = []

      const result = journalReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return journal when type is GET_JOURNAL', () => {
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = {
        type: 'GET_JOURNAL',
        data
      }

      const result = journalReducer(undefined, action)

      expect(result).toEqual(data)
    })

    it('should clear journal when type is CLEAR_JOURNAL', () => {
      const expected = []
      const data = [
        { name: 'Name', grade: 'Hard' }
      ]
      const action = { type: 'CLEAR_JOURNAL' }

      const result = journalReducer(data, action)

      expect(result).toEqual(expected)
    })
  })

  describe('disciplineReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = true

      const result = disciplineReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should toggle when type is TOGGLE_DISCIPLINE', () => {
      const action = {
        type: 'TOGGLE_DISCIPLINE',
        discipline: false
      }
      const expected = false

      const result = disciplineReducer({}, action)

      expect(result).toEqual(expected)
    })
  })

  describe('currentProjectReducer', () => {
    it('should return the default state if none is given', () => {
      const expected = ''

      const result = currentProjectReducer(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return the id of the current project', () => {
      const expected = 2
      const action = {
        type: 'SET_CURRENT_PROJECT',
        id: 2
      }

      const result = currentProjectReducer(undefined, action)

      expect(result).toEqual(expected)
    })
  })
})