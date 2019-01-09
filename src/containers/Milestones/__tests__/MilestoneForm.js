import React from 'react'
import { shallow } from 'enzyme'
import { addDataThunk } from '../../../thunks/addData'
import { mapStateToProps, mapDispatchToProps, MilestoneForm } from '../MilestoneForm'

jest.mock('../../../thunks/addData')

describe('Milestone Form', () => {
  let mockUser
  let mockProject
  let mockAddMilestone

  beforeEach(() => {
    mockUser = {
      name: 'T-Rex',
      email: 'chompy@yahoo.com',
      password: 'smallarms',
      id: 4
    }
    mockProject = 2
    mockAddMilestone = jest.fn().mockImplementation(() => true)
  })

  describe('MilestoneForm Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<MilestoneForm user={mockUser} project={mockProject} addMilestone={mockAddMilestone} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = {
        caption: '',
        milestoneAdded: false
      }
      const wrapper = shallow(<MilestoneForm user={mockUser} project={mockProject} addMilestone={mockAddMilestone} />)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should reset state on change of the inputs', async () => {
      const expected = 'Did the thing!'
      const e = { target: { name: 'caption', value: 'Did the thing!' } }
      const wrapper = shallow(<MilestoneForm user={mockUser} project={mockProject} addMilestone={mockAddMilestone} />)

      wrapper.find('textarea').simulate('change', e)

      expect(wrapper.state().caption).toEqual(expected)
    })

    it('should reset state when a milestone is added', async () => {
      const e = { preventDefault: jest.fn() }
      const wrapper = shallow(<MilestoneForm user={mockUser} project={mockProject} addMilestone={mockAddMilestone} />)
      
      await wrapper.find('.milestone-form').simulate('submit', e)

      expect(wrapper.state().milestoneAdded).toEqual(true)
    })

    it('should not reset state if milestone cannot be added', async () => {
      mockAddMilestone.mockImplementation(() => false)
      const e = { preventDefault: jest.fn() }
      const wrapper = shallow(<MilestoneForm user={mockUser} project={mockProject} addMilestone={mockAddMilestone} />)
      
      await wrapper.find('.milestone-form').simulate('submit', e)

      expect(wrapper.state().milestoneAdded).toEqual(false)
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = { currentUser: mockUser, currentProject: mockProject }
      const expected = { user: mockUser, project: mockProject }
      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method addMilestone', () => {
      const mockDispatch = jest.fn()
      const expected = addDataThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addMilestone()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})