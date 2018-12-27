import { dataHelper, priorityHelper } from '../projectHelpers'
import * as cal from '../calendarHelpers'

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

  describe('calendarHelpers', () => {
    
  })
})