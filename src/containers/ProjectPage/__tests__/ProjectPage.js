import React from 'react'
import { shallow } from 'enzyme'
import { mapStateToProps, ProjectPage } from '../ProjectPage'

describe('Project Page', () => {
  let mockUser
  let mockJournal
  let mockMilestones
  let mockProj
  let mockSentProj

  beforeEach(() => {
    mockUser = {
      name: 'Han Solo',
      email: 'solo@solo.com',
      password: 'hansolo'
    }
    mockJournal = [
      {
        date: '11/14/15',
        entry: 'Some stuff about some things'
      }
    ]
    mockMilestones = [
      {
        date: '4/6/76',
        caption: 'Did something'
      }
    ]
    mockProj = {
      name: 'Top Notch',
      location: 'RMNP, CO',
      grade: 'V13',
      caption: '',
      id: 4,
      high_point: 5,
      moves_total: 7
    }
    mockSentProj = {
      name: 'Top Notch',
      location: 'RMNP, CO',
      grade: 'V13',
      caption: '',
      id: 4,
      high_point: 7,
      moves_total: 7
    }
  })

  describe('ProjectPage Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<ProjectPage user={mockUser} project={mockSentProj} journal={mockJournal} milestones={mockMilestones} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no project', () => {
      const wrapper = shallow(<ProjectPage user={mockUser} project={null} journal={mockJournal} milestones={mockMilestones} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with a completed project', () => {
      const wrapper = shallow(<ProjectPage user={mockUser} project={mockSentProj} journal={mockJournal} milestones={mockMilestones} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<ProjectPage user={noUser} project={mockSentProj} journal={mockJournal} milestones={mockMilestones} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = { milestonesOpen: false, journalOpen: false }
      const wrapper = shallow(<ProjectPage user={mockUser} project={mockSentProj} journal={mockJournal} milestones={mockMilestones} />)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should toggle state', () => {
      const expected = { milestonesOpen: true, journalOpen: false }
      const expected2 = { milestonesOpen: true, journalOpen: true }
      const wrapper = shallow(<ProjectPage user={mockUser} project={mockProj} journal={mockJournal} milestones={mockMilestones} />)

      wrapper.find('.proj-milestones').simulate('click')
      expect(wrapper.state()).toEqual(expected)

      wrapper.find('.proj-journal').simulate('click')
      expect(wrapper.state()).toEqual(expected2)
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = {
        currentUser: mockUser,
        milestones: mockMilestones,
        journal: mockJournal
      }
      const expected = {
        user: mockUser,
        milestones: mockMilestones,
        journal: mockJournal
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })
})