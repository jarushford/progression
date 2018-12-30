import React from 'react'
import { shallow } from 'enzyme'
import { mapStateToProps, mapDispatchToProps, Training } from '../Training'
import { toggleComplete } from '../../../actions'

describe('Training', () => {
  let mockUser
  let mockData 

  beforeEach(() => {
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
      0: { workout_date: today, type: 'Power', description: 'do stuff', completed: true },
      2: { workout_date: `${month}/14/${year}`, type: 'Power', description: 'do stuff', completed: true },
      3: { workout_date: `${month}/29/${year}`, type: 'Power', description: 'do stuff', completed: true }
    }
  })

  describe('Training Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Training user={mockUser} trainingDataUnclean={mockData} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<Training user={noUser} trainingDataUnclean={mockData} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no data', () => {
      const noData = {}
      const wrapper = shallow(<Training user={mockUser} trainingDataUnclean={noData} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should toggle complete on click', () => {
      const mockToggle = jest.fn()
      const wrapper = shallow(<Training user={mockUser} trainingDataUnclean={mockData} toggleComplete={mockToggle} />)

      wrapper.find('.workout-item').first().simulate('click')
      expect(mockToggle).toBeCalled()

      wrapper.find('.workout-item').last().simulate('click')
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
      const expected = toggleComplete()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.toggleComplete()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})