import React from 'react'
import { shallow } from 'enzyme'
import { deleteDataThunk } from '../../../thunks/deleteData'
import { mapStateToProps, mapDispatchToProps, TrainingAll } from '../TrainingAll'
import { updateDataThunk } from '../../../thunks/updateData'

jest.mock('../../../thunks/updateData')
jest.mock('../../../thunks/deleteData')

describe('Training All', () => {
  let mockUser 
  let mockData
  let mockToggle
  let mockDelete

  beforeEach(() => {
    mockUser = {
      name: 'Larry',
      email: 'larry@gmail.com',
      password: 'chrimbus',
      id: 8
    }
    mockData = {
      0: { workout_date: '3/3/13', type: 'Power', description: 'do stuff', completed: true },
      1: { workout_date: '3/1/13', type: 'Power', description: 'do other stuff', completed: true },
      2: { workout_date: '3/6/13', type: 'Power', description: 'do other stuff', completed: true },
      3: { workout_date: '3/7/13', type: 'Power', description: 'do other stuff', completed: true }
    }
    mockToggle = jest.fn()
    mockDelete = jest.fn()
  })

  describe('TrainingAll Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} deleteWorkout={mockDelete} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<TrainingAll user={noUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} deleteWorkout={mockDelete} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no data', () => {
      const noData = {}
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={noData} toggleComplete={mockToggle} deleteWorkout={mockDelete} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should toggle a workout completed', () => {
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} deleteWorkout={mockDelete} />)

      wrapper.find('.project').first().simulate('click')

      expect(mockToggle).toBeCalled()
    })

    it('should delete a workout on click', () => {
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={mockData} deleteWorkout={mockDelete} toggleComplete={mockToggle} />)

      wrapper.find('.fa-times').first().simulate('click')

      expect(mockDelete).toBeCalled()
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

    it('should return a props object with a method deleteWorkout', () => {
      const mockDispatch = jest.fn()
      const expected = deleteDataThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.deleteWorkout()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})