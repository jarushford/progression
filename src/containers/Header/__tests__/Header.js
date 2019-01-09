import React from 'react'
import { shallow } from 'enzyme'
import { logoutUser, clearAscents, clearProjects, clearWorkouts } from '../../../actions'
import { mapStateToProps, mapDispatchToProps, Header } from '../Header'

jest.mock('../../../actions')

describe('Header', () => {
  let mockUser
  let mockClearAscents
  let mockClearProjects
  let mockClearWorkouts
  let mockLogoutUser
  let mockToggle

  beforeEach(() => {
    mockUser = {
      name: 'Frodo',
      email: 'thechosenone@hobbiton.org',
      password: 'Sam'
    }
    mockClearAscents = jest.fn()
    mockClearProjects = jest.fn()
    mockClearWorkouts = jest.fn()
    mockLogoutUser = jest.fn()
    mockToggle = jest.fn()
  })

  describe('Header Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Header currentUser={mockUser} clearAscents={mockClearAscents} clearProjects={mockClearProjects} clearWorkouts={mockClearWorkouts} logoutUser={mockLogoutUser} toggleMenu={mockToggle} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<Header currentUser={noUser} clearAscents={mockClearAscents} clearProjects={mockClearProjects} clearWorkouts={mockClearWorkouts} logoutUser={mockLogoutUser} toggleMenu={mockToggle} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should logout a user when they click on log out', () => {
      const wrapper = shallow(<Header currentUser={mockUser} clearAscents={mockClearAscents} clearProjects={mockClearProjects} clearWorkouts={mockClearWorkouts} logoutUser={mockLogoutUser} toggleMenu={mockToggle} />)

      wrapper.find('.logout-link').first().simulate('click')

      expect(mockClearAscents).toBeCalled()
      expect(mockClearProjects).toBeCalled()
      expect(mockClearWorkouts).toBeCalled()
      expect(mockLogoutUser).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    const mockState = {
      currentUser: mockUser
    }

    const mappedProps = mapStateToProps(mockState)

    expect(mappedProps).toEqual(mockState)
  })

  describe('mapDispatchToProps', () => {
    let mockDispatch
    let mappedProps

    beforeEach(() => {
      mockDispatch = jest.fn()
      mappedProps = mapDispatchToProps(mockDispatch)
    })

    it('should return a props object with a method clearAscents', () => {
      const expected = clearAscents()

      mappedProps.clearAscents()

      expect(mockDispatch).toBeCalledWith(expected)
    })

    it('should return a props object with a method clearProjects', () => {
      const expected = clearProjects()

      mappedProps.clearProjects()

      expect(mockDispatch).toBeCalledWith(expected)
    })

    it('should return a props object with a method clearWorkouts', () => {
      const expected = clearWorkouts()

      mappedProps.clearWorkouts()

      expect(mockDispatch).toBeCalledWith(expected)
    })

    it('should return a props object with a method logoutUser', () => {
      const expected = logoutUser()

      mappedProps.logoutUser()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})