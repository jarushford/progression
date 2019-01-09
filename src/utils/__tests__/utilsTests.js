import { dataHelper, priorityHelper } from '../projectHelpers'
import { clearThunkHelper, getThunkHelper } from '../thunkHelpers'
import * as cal from '../calendarHelpers'
import { clearAscents, getAscents } from '../../actions'
import { Training } from '../../containers/Training/Training'
import { daysInPreviousMonth } from '../daysInPreviousMonth' 
import { shallow } from 'enzyme'
import React from 'react'

jest.mock('../daysInPreviousMonth')

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
    let mockData
    let mockToggle
    let mockUser

    beforeEach(() => {
      global.Date = jest.fn().mockImplementation(() => ({
        getDate: jest.fn().mockImplementation(() => 8),
        getMonth: jest.fn().mockImplementation(() => 1),
        getFullYear: jest.fn().mockImplementation(() => 2019),
        getDay: jest.fn().mockImplementation(() => 2)
      }))
      mockData = {
        26: { workout_date: `01/07/2019`, type: 'Power', description: 'do suff', completed: true },
        27: { workout_date: `01/08/2019`, type: 'Power', description: 'do stuff', completed: false },
        28: { workout_date: `01/09/2019`, type: 'Power', description: 'do stuff', completed: true }
      }
      mockToggle = jest.fn()
      mockUser = {
        name: 'Lenny',
        email: 'len@len.com',
        password: 'sdf'
      }
    })

    describe('daysOfWeekHelper', () => {
      it('should return the correct JSX based on the data passed in', () => {
        const weekIndex = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
        const result = cal.daysOfWeekHelper(mockData[26], '01/07/2019', '01/08/2019', weekIndex, 2, null, mockToggle)

        expect(result[1].length).toEqual(1)
      })

      it('should return the correct JSX based on the data passed in', () => {
        const weekIndex = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
        const result = cal.daysOfWeekHelper(mockData[28], '01/09/2019', '01/08/2019', weekIndex, 2, null, mockToggle)

        expect(result[3].length).toEqual(1)
      })
    })

    describe('endOfMonthHelper', () => {
      it('should return the correct JSX based on the data passed in', () => {
        global.Date = jest.fn().mockImplementation(() => ({
          getDate: jest.fn().mockImplementation(() => 28),
          getMonth: jest.fn().mockImplementation(() => 1),
          getFullYear: jest.fn().mockImplementation(() => 2019),
          getDay: jest.fn().mockImplementation(() => 2)
        }))
        mockData = {
          28: { workout_date: `02/02/2019`, type: 'Power', description: 'do stuff', completed: true }
        }
        const weekIndex = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
        const result = cal.endOfMonthHelper(mockData[28], '02/02/2019', '01/28/2019', weekIndex, 2, mockData, mockToggle)
        const wrapper = shallow(<Training toggleComplete={mockToggle} trainingDataUnclean={mockData} user={mockUser} />)
        
        wrapper.find('.workout-item').simulate('click')
        
        expect(result[4].length).toEqual(1)
        expect(mockToggle).toBeCalled()
      })

      it('should return the correct JSX based on the data passed in', () => {
        global.Date = jest.fn().mockImplementation(() => ({
          getDate: jest.fn().mockImplementation(() => 2),
          getMonth: jest.fn().mockImplementation(() => 2),
          getFullYear: jest.fn().mockImplementation(() => 2019),
          getDay: jest.fn().mockImplementation(() => 5)
        }))
        mockData = {
          28: { workout_date: `01/28/2019`, type: 'Power', description: 'do stuff', completed: true }
        }
        daysInPreviousMonth.mockImplementation(() => 31)
        const weekIndex = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
        const result = cal.endOfMonthHelper(mockData[28], '01/28/2019', '02/02/2019', weekIndex, 5, mockData, mockToggle)
        const wrapper = shallow(<Training toggleComplete={mockToggle} trainingDataUnclean={mockData} user={mockUser} />)
        
        wrapper.find('.workout-item').simulate('click')
        expect(result[0].length).toEqual(1)
        expect(mockToggle).toBeCalled()
      })

      it('should return the correct JSX based on the data passed in', () => {
        global.Date = jest.fn().mockImplementation(() => ({
          getDate: jest.fn().mockImplementation(() => 2),
          getMonth: jest.fn().mockImplementation(() => 2),
          getFullYear: jest.fn().mockImplementation(() => 2019),
          getDay: jest.fn().mockImplementation(() => 5)
        }))
        mockData = {
          28: { workout_date: `02/03/2019`, type: 'Power', description: 'do stuff', completed: true }
        }
        daysInPreviousMonth.mockImplementation(() => 31)
        const weekIndex = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
        const result = cal.endOfMonthHelper(mockData[28], '02/03/2019', '02/02/2019', weekIndex, 5, mockData, mockToggle)
        const wrapper = shallow(<Training toggleComplete={mockToggle} trainingDataUnclean={mockData} user={mockUser} />)
        
        wrapper.find('.workout-item').simulate('click')
        expect(result[6].length).toEqual(1)
        expect(mockToggle).toBeCalled()
      })
    })

    describe('highlightHelper', () => {
      it('should return true if the day passed in should be highlighted', () => {
        const result = cal.highlightHelper('tuesday')

        expect(result).toEqual(true)
      })

      it('should return false if the day passed in shouldnt be highlighted', () => {
        const result = cal.highlightHelper('sunday')

        expect(result).toEqual(false)
      })
    })

    describe('dateHelper', () => {
      it('should return adjustment if day is not in endOfMonthIndex', () => {
        const result = cal.dateHelper(0)
        
        expect(result).toEqual(6)
      })
      
      it('should return adjustment if day is not in endOfMonthIndex', () => {
        global.Date = jest.fn().mockImplementation(() => ({
          getDate: jest.fn().mockImplementation(() => 4),
          getMonth: jest.fn().mockImplementation(() => 1),
          getFullYear: jest.fn().mockImplementation(() => 2019),
          getDay: jest.fn().mockImplementation(() => 4)
        }))
        const result = cal.dateHelper(4)
        
        expect(result).toEqual(4)
      })

      it('should return adjustment if day is not in endOfMonthIndex', () => {
        global.Date = jest.fn().mockImplementation(() => ({
          getDate: jest.fn().mockImplementation(() => 29),
          getMonth: jest.fn().mockImplementation(() => 1),
          getFullYear: jest.fn().mockImplementation(() => 2019),
          getDay: jest.fn().mockImplementation(() => 2)
        }))
        const result = cal.dateHelper(4)
        
        expect(result).toEqual(2)
      })
    })
  })
})