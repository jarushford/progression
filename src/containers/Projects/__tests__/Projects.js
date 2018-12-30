import React from 'react'
import { shallow } from 'enzyme'
import { mapStateToProps, mapDispatchToProps, Projects } from '../Projects'
import { deleteDataThunk } from '../../../thunks/deleteData'
import { fetchDataThunk } from '../../../thunks/fetchData'
import { setCurrentProject } from '../../../actions'

jest.mock('../../../thunks/deleteData')
jest.mock('../../../thunks/fetchData')
jest.mock('../../../actions')

describe('Projects', () => {
  let mockUser
  let mockProjects
  let mockFetch
  let mockDelete

  beforeEach(() => {
    mockUser = {
      name: 'Olaf',
      email: 'olaf@thatplace.com',
      password: 'olaf',
      id: 1
    }
    mockProjects = [ 
      {
        name: 'Nuthin But Sunshine',
        location: 'RMNP, CO',
        grade: 'V13',
        caption: '',
        id: 42,
        high_point: 5,
        moves_total: 7
      },
      {
        name: 'Top Notch',
        location: 'RMNP, CO',
        grade: 'V13',
        caption: '',
        id: 4,
        high_point: 7,
        moves_total: 7
      }
    ]
    mockFetch = jest.fn()
    mockDelete = jest.fn()
  })

  describe('Projects Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Projects user={mockUser} projects={mockProjects} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<Projects user={noUser} projects={mockProjects} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no projects', () => {
      const noProjects = []
      const wrapper = shallow(<Projects user={mockUser} projects={noProjects} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should fetch project data on click', async () => {
      const wrapper = shallow(<Projects user={mockUser} projects={mockProjects}  fetchData={mockFetch} />)

      await wrapper.find('.project-link').first().simulate('click')

      expect(mockFetch).toHaveBeenNthCalledWith(1, 1, 42, 'journal')
      expect(mockFetch).toHaveBeenNthCalledWith(2, 1, 42, 'milestone')
    })

    it('should delete a project on click', () => {
      const wrapper = shallow(<Projects user={mockUser} projects={mockProjects}  deleteProject={mockDelete} />)

      wrapper.find('.fa-times').first().simulate('click')

      expect(mockDelete).toBeCalledWith(42, 1, null, 'project')
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = { currentUser: mockUser, projects: mockProjects }
      const expected = { user: mockUser, projects: mockProjects }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method deleteProject', () => {
      const mockDispatch = jest.fn()
      const expected = deleteDataThunk()
      
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.deleteProject()

      expect(mockDispatch).toBeCalledWith(expected)
    })

    it('should return a props object with a method setCurrentProject', () => {
      const mockDispatch = jest.fn()
      const expected = setCurrentProject()
      
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setCurrentProject()

      expect(mockDispatch).toBeCalledWith(expected)
    })

    it('should return a props object with a method fetchData', () => {
      const mockDispatch = jest.fn()
      const expected = fetchDataThunk()
      
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchData()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})
