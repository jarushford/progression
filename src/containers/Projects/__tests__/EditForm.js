import React from 'react'
import { EditForm, mapStateToProps, mapDispatchToProps } from '../EditForm'
import { updateDataThunk } from '../../../thunks/updateData'
import { shallow } from 'enzyme'

jest.mock('../../../thunks/updateData')

describe('editForm', () => {
  let mockUser
  let mockProjects
  let mockProject
  let mockEditProj
  let wrapper

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
        grade: 13,
        caption: '',
        id: 42,
        high_point: 5,
        moves_total: 7
      },
      {
        name: 'Top Notch',
        location: 'RMNP, CO',
        grade: 5101,
        priority: 8,
        caption: '',
        id: 4,
        season: 'summer',
        high_point: 7,
        moves_total: 7,
        moves_done: 3
      }
    ]
    mockProject = 4
    mockEditProj = jest.fn().mockImplementation(() => true)
    wrapper = shallow(<EditForm 
      user={mockUser}
      project={mockProject}
      projects={mockProjects}
      disciplineBoulder={true}
      editProject={mockEditProj}
    />)
  })

  describe('EditForm Component', () => {
    it('should match the snapshot for boulder', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot for sport', () => {
      const wrapper = shallow(<EditForm 
        user={mockUser}
        project={mockProject}
        projects={mockProjects}
        disciplineBoulder={false}
        editProject={mockEditProj}
      />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no project', () => {
      const wrapper = shallow(<EditForm 
        user={mockUser}
        project={8}
        projects={mockProjects}
        disciplineBoulder={false}
        editProject={mockEditProj}
      />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = {
        name: 'Top Notch',
        location: 'RMNP, CO',
        grade: 5101,
        priority: 8,
        caption: '',
        season: 'summer',
        high_point: 7,
        moves_total: 7,
        moves_done: 3,
        projectEdited: false
      }

      expect(wrapper.state()).toEqual(expected)
    })

    it('should update state when the inputs change', async () => {
      const expected = 'Top Notch'
      const e = { target: { name: 'Top Notch' } }

      await wrapper.find('input').first().simulate('change', e)

      expect(wrapper.state().name).toEqual(expected)
    })

    it('should submit changes when form is submitted successfully', async () => {
      const e = { preventDefault: jest.fn() }
      wrapper.setState({
        name: 'Top Notch',
        location: 'RMNP, CO',
        grade: 5101,
        priority: 8,
        caption: '',
        season: 'summer',
        high_point: 7,
        moves_total: 7,
        moves_done: 3,
        projectEdited: false
      })

      await wrapper.find('.project-form').simulate('submit', e)

      expect(wrapper.state().projectEdited).toEqual(true)
    })

    it('should not submit changes when form is unsuccessfull', async () => {
      const e = { preventDefault: jest.fn() }
      mockEditProj.mockImplementation(() => false)

      await wrapper.find('.project-form').simulate('submit', e)

      expect(wrapper.state().projectEdited).toEqual(false)
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with the correct properties from state', () => {
      const mockState = {
        currentUser: mockUser,
        currentProject: mockProject,
        projects: mockProjects,
        disciplineBoulder: true,
        error: ''
      }
      const expected = {
        user: mockUser,
        project: mockProject,
        projects: mockProjects,
        disciplineBoulder: true
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch updateDataThunk when editProject is called', () => {
      const mockDispatch = jest.fn()
      const expected = updateDataThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.editProject()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})