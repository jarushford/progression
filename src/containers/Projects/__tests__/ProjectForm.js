import React from 'react'
import { shallow } from 'enzyme'
import { addDataThunk } from '../../../thunks/addData'
import { mapStateToProps, mapDispatchToProps, ProjectForm } from '../ProjectForm'

jest.mock('../../../thunks/addData')

describe('Project Form', () => {
  let mockUser
  let mockAddProj

  beforeEach(() => {
    mockUser = {
      name: 'Olaf',
      email: 'olaf@thatplace.com',
      password: 'olaf',
      id: 1
    }
    mockAddProj = jest.fn().mockImplementation(() => true)
  })

  describe('ProjectForm Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<ProjectForm user={mockUser} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = {
        name: '',
        location: '',
        caption: '',
        grade: '',
        priority: '',
        season: '',
        moves_total: 0,
        moves_done: 0,
        high_point: 0,
        projectAdded: false
      }
      const wrapper = shallow(<ProjectForm user={mockUser} />)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should update state on change of the inputs', async () => {
      const expected = 'Thats a nice boulder'
      const wrapper = shallow(<ProjectForm user={mockUser} />)
      const e = { target: { name: 'name', value: 'Thats a nice boulder' } }

      await wrapper.find('input').first().simulate('change', e)

      expect(wrapper.state().name).toEqual(expected)
    })

    it('should update state when a project is added', async () => {
      const e = { preventDefault: jest.fn() }
      const wrapper = shallow(<ProjectForm user={mockUser} addProject={mockAddProj} />)
      wrapper.setState({
        name: 'Name',
        location: 'Place',
        caption: 'stuff',
        grade: 'V0',
        priority: '1',
        season: 'winter',
        moves_total: 10,
        moves_done: 10,
        high_point: 5
      })

      await wrapper.find('.project-form').simulate('submit', e)

      expect(wrapper.state().projectAdded).toEqual(true)
    })

    it('should no update state if project is not added', async () => {
      mockAddProj.mockImplementation(() => false)
      const e = { preventDefault: jest.fn() }
      const wrapper = shallow(<ProjectForm user={mockUser} addProject={mockAddProj} />)
      wrapper.setState({
        name: 'Name',
        location: 'Place',
        caption: 'stuff',
        grade: 'V0',
        priority: '1',
        season: 'winter',
        moves_total: 10,
        moves_done: 10,
        high_point: 5
      })

      await wrapper.find('.project-form').simulate('submit', e)

      expect(wrapper.state().projectAdded).toEqual(false)
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
    it('should return a props object with a method addProject', () => {
      const mockDispatch = jest.fn()
      const expected = addDataThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addProject()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})