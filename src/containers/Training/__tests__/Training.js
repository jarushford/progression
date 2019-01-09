import React from 'react'
import { shallow } from 'enzyme'
import { mapStateToProps, mapDispatchToProps, Training } from '../Training'
import { updateDataThunk } from '../../../thunks/updateData'

jest.mock('../../../thunks/updateData')

describe('Training', () => {
  let mockUser
  let mockData
  let mockToggle

  beforeEach(() => {
    global.Date = jest.fn().mockImplementation(() => ({
      getDate: jest.fn().mockImplementation(() => 8),
      getMonth: jest.fn().mockImplementation(() => 1),
      getFullYear: jest.fn().mockImplementation(() => 2019),
      getDay: jest.fn().mockImplementation(() => 2)
    }))

    mockUser = {
      name: 'Larry',
      email: 'larry@gmail.com',
      password: 'chrimbus',
      id: 8
    }
    const date = new Date()
    const month = `${('0' + (date.getMonth() + 1)).slice(-2)}`
    const year = `${date.getFullYear()}`
    const today = 
      `${('0' + (date.getMonth() + 1)).slice(-2)}/`
        + `${('0' + (date.getDate())).slice(-2)}/`
        + `${date.getFullYear()}`
    mockData = {
      0: { workout_date: today, type: 'Power', description: 'do stuff', completed: false },
      1: { workout_date: today, type: 'Power', description: 'do stuff', completed: true },
      2: { workout_date: `${month}/14/${year}`, type: 'Power', description: 'do stuff', completed: true },
      3: { workout_date: `${month}/29/${year}`, type: 'Power', description: 'do stuff', completed: true },
      4: { workout_date: `${month}/30/${year}`, type: 'Power', description: 'do stuff', completed: false },
      24: { workout_date: `${month}/05/${year}`, type: 'Power', description: 'do stuff', completed: true },
      25: { workout_date: `${month}/06/${year}`, type: 'Power', description: 'do stuff', completed: true },
      26: { workout_date: `${month}/07/${year}`, type: 'Power', description: 'do suff', completed: true },
      27: { workout_date: `${month}/08/${year}`, type: 'Power', description: 'do stuff', completed: false },
      28: { workout_date: `${month}/09/${year}`, type: 'Power', description: 'do stuff', completed: true },
      29: { workout_date: `${month}/10/${year}`, type: 'Power', description: 'do stuff', completed: false },
      30: { workout_date: `${month}/11/${year}`, type: 'Power', description: 'do stuff', completed: true },
      31: { workout_date: `${month}/12/${year}`, type: 'Power', description: 'do stuff', completed: false },
      32: { workout_date: `${month}/13/${year}`, type: 'Power', description: 'do stuff', completed: true }
    }
    mockToggle = jest.fn()
  })

  describe('Training Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Training user={mockUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<Training user={noUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no data', () => {
      const noData = {}
      const wrapper = shallow(<Training user={mockUser} trainingDataUnclean={noData} toggleComplete={mockToggle} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should toggle complete on click', () => {
      const wrapper = shallow(<Training user={mockUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} />)

      wrapper.find('.workout-item').first().simulate('click')
      expect(mockToggle).toBeCalled()

      wrapper.find('.workout-item').last().simulate('click')
      expect(mockToggle).toBeCalled()
    })

    it('should toggle complete on click for today', () => {
      const date = new Date()
      const today = 
      `${('0' + (date.getMonth() + 1)).slice(-2)}/`
        + `${('0' + (date.getDate())).slice(-2)}/`
        + `${date.getFullYear()}`
      const mockData = {
        0: { workout_date: today, type: 'Power', description: 'do stuff', completed: false }
      }
      const wrapper = shallow(<Training user={mockUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} />)

      wrapper.find('.workout-item').first().simulate('click')
      expect(mockToggle).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = { currentUser: mockUser, trainingData: mockData }
      const expected = { user: mockUser, trainingDataUnclean: mockData }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method toggleComplete', () => {
      const mockDispatch = jest.fn()
      const expected = updateDataThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.toggleComplete()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})