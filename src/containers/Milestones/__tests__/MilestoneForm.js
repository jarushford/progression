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
    mockProject = {
      name: 'Top Notch',
      location: 'RMNP, CO',
      id: 2
    }
    mockAddMilestone = jest.fn().mockImplementation(() => true)
  })

  describe('MilestoneForm Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<MilestoneForm />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = {
        caption: '',
        milestoneAdded: false
      }
      const wrapper = shallow(<MilestoneForm />)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should reset state on change of the inputs', async () => {
      const expected = 'Did the thing!'
      const e = { target: { name: 'caption', value: 'Did the thing!' } }
      const wrapper = shallow(<MilestoneForm />)

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

  })

  describe('mapDispatchToProps', () => {
    
  })
})