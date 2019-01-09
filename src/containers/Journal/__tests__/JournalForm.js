import React from 'react'
import { shallow } from 'enzyme'
import { addDataThunk } from '../../../thunks/addData'
import { mapStateToProps, mapDispatchToProps, JournalForm } from '../JournalForm'

jest.mock('../../../thunks/addData')

describe('Journal Form', () => {
  let mockAddEntry
  let mockUser
  let mockProject

  beforeEach(() => {
    mockUser = {
      name: 'T-Rex',
      email: 'chompy@yahoo.com',
      password: 'smallarms',
      id: 4
    }
    mockProject = 2
    mockAddEntry = jest.fn().mockImplementation(() => true)
  })

  describe('JournalForm Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<JournalForm addJournal={mockAddEntry} user={mockUser} project={mockProject} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default state', () => {
      const expected = { entry: '', entryAdded: false }
      const wrapper = shallow(<JournalForm addJournal={mockAddEntry} user={mockUser} project={mockProject} />)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should update state on input change', () => {
      const expected = 'Rocks!'
      const e = { target: { name: 'entry', value: 'Rocks!' } }
      const wrapper = shallow(<JournalForm addJournal={mockAddEntry} user={mockUser} project={mockProject} />)

      wrapper.find('textarea').simulate('change', e)

      expect(wrapper.state().entry).toEqual(expected)
    })

    it('should add a journal entry on submit', async () => {
      const wrapper = shallow(<JournalForm addJournal={mockAddEntry} user={mockUser} project={mockProject} />)
      wrapper.setState({ entry: 'Rocks!' })
      const e = { preventDefault: jest.fn() }

      await wrapper.find('.journal-form').simulate('submit', e)

      expect(wrapper.state().entryAdded).toEqual(true)
    })

    it('should not reset state if the entry is not added', async () => {
      mockAddEntry.mockImplementation(() => false)
      const wrapper = shallow(<JournalForm addJournal={mockAddEntry} user={mockUser} project={mockProject} />)
      wrapper.setState({ entry: 'Rocks!' })
      const e = { preventDefault: jest.fn() }

      await wrapper.find('.journal-form').simulate('submit', e)

      expect(wrapper.state().entryAdded).toEqual(false)
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
    it('should return a props object with a method addJournal', () => {
      const mockDispatch = jest.fn()
      const expected = addDataThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addJournal()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})