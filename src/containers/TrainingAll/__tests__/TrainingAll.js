import React from 'react'
import { shallow } from 'enzyme'
import { deleteDataThunk } from '../../../thunks/deleteData'
import { mapStateToProps, mapDispatchToProps, TrainingAll } from '../TrainingAll'
import { toggleComplete } from '../../../actions'

jest.mock('../../../thunks/deleteData')

describe('Training All', () => {
  let mockUser 
  let mockData

  beforeEach(() => {
    mockUser = {
      name: 'Larry',
      email: 'larry@gmail.com',
      password: 'chrimbus',
      id: 8
    }
    mockData = {
      0: { workout_date: '3/3/31', type: 'Power', description: 'do stuff', completed: true }
    }
  })

  describe('TrainingAll Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={mockData} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<TrainingAll user={noUser} trainingDataUnclean={mockData} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no data', () => {
      const noData = {}
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={noData} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should toggle a workout completed', () => {
      const mockToggle = jest.fn()
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} />)

      wrapper.find('.project').first().simulate('click')

      expect(mockToggle).toBeCalled()
    })

    it('should delete a workout on click', () => {
      const mockDelete = jest.fn()
      const wrapper = shallow(<TrainingAll user={mockUser} trainingDataUnclean={mockData} deleteWorkout={mockDelete} />)

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
      const expected = toggleComplete()

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