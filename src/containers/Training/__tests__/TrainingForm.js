import React from 'react'
import { shallow } from 'enzyme'
import { addDataThunk } from '../../../thunks/addData'
import { mapStateToProps, mapDispatchToProps, TrainingForm } from '../TrainingForm'

jest.mock('../../../thunks/addData')

describe('TrainingForm', () => {
  let mockUser
  let mockAdd

  beforeEach(() => {
    mockUser = {
      name: 'Spiderpig',
      email: 'spider@pig.oink',
      password:' baconweb',
      id: 12
    }
    mockAdd = jest.fn().mockImplementation(() => true)
    global.Date = jest.fn().mockImplementation(() => ({
      getDate: jest.fn().mockImplementation(() => 8),
      getMonth: jest.fn().mockImplementation(() => 0),
      getFullYear: jest.fn().mockImplementation(() => 2019),
      getDay: jest.fn().mockImplementation(() => 2)
    }))
  })

  describe('TrainingForm Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<TrainingForm user={mockUser} addWorkout={mockAdd} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<TrainingForm user={noUser} addWorkout={mockAdd} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot for February', () => {
      const wrapper = shallow(<TrainingForm user={mockUser} addWorkout={mockAdd} />)
      wrapper.setState({ month: '2' })

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot for long months', () => {
      const wrapper = shallow(<TrainingForm user={mockUser} addWorkout={mockAdd} />)
      wrapper.setState({ month: '1' })

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', async () => {
      const date = new Date()
      const expected = {
        day: ('0' + (date.getDate())).slice(-2).toString(),
        month: ('0' + (date.getMonth() + 1)).slice(-2).toString(),
        year: date.getFullYear().toString(),
        type: '',
        description: '',
        workoutAdded: false
      }
      const wrapper = shallow(<TrainingForm user={mockUser} addWorkout={mockAdd} />)
      await wrapper.instance().componentDidMount()

      expect(wrapper.state()).toEqual(expected)
    })

    it('should update state on change of an input', async () => {
      const expected = 'Power'
      const wrapper = shallow(<TrainingForm user={mockUser} addWorkout={mockAdd} />)
      const e = { target: { name: 'type', value: 'Power' } }

      await wrapper.find('#type').simulate('change', e)

      expect(wrapper.state().type).toEqual(expected)
    })

    it('should update state when a workout is added', async () => {
      const e = { preventDefault: jest.fn() }
      const wrapper = shallow(<TrainingForm user={mockUser} addWorkout={mockAdd} />)
      wrapper.setState({ type: 'Power', description: 'Stuff!' })

      await wrapper.find('.training-form').simulate('submit', e)

      expect(wrapper.state().workoutAdded).toEqual(true)
    })

    it('should not update state if the workout is not added', async () => {
      const e = { preventDefault: jest.fn() }
      mockAdd.mockImplementation(() => false)
      const wrapper = shallow(<TrainingForm user={mockUser} addWorkout={mockAdd} />)
      wrapper.setState({ type: 'Power', description: 'Stuff!' })

      await wrapper.find('.training-form').simulate('submit', e)

      expect(wrapper.state().workoutAdded).toEqual(false)
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = { currentUser: mockUser }
      const expected = { user: mockUser }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn()
    const expected = addDataThunk()

    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.addWorkout()

    expect(mockDispatch).toBeCalledWith(expected)
  })
})