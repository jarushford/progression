import { dataHelper, priorityHelper } from '../projectHelpers'
import { clearThunkHelper, getThunkHelper } from '../thunkHelpers'
import * as cal from '../calendarHelpers'
import { clearAscents, getAscents } from '../../actions'

describe('UTILS', () => {
  describe('projectHelpers', () => {
    it('should return a class modifier from dataHelper when data is given', () => {
      const expected = 'four'

      const result = dataHelper(4, 12)

      expect(result).toEqual(expected)
    })

    it('should return a priority class from priorityHelper', () => {
      const expected = 'nine'

      const result = priorityHelper(9)

      expect(result).toEqual(expected)
    })
  })

  describe('thunkHelpers', () => {
    it('clearThunkHelper should return the correct action', () => {
      const expected = clearAscents

      const result = clearThunkHelper('ascent')
      
      expect(result).toEqual(expected)
    })

    it('getThunkHelper should return the correct action', () => {
      const expected = getAscents
      
      const result = getThunkHelper('ascent')

      expect(result).toEqual(expected)
    })
  })

  describe('Calendar Helpers', () => {
    it.skip('return the correct adjustment from dateHelper', () => {
      
    })
  })
})