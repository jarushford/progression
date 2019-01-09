import React from 'react'
import { shallow } from 'enzyme'
import { addDataThunk } from '../../../thunks/addData'
import { AscentForm, mapStateToProps, mapDispatchToProps } from '../AscentForm'

jest.mock('../../../thunks/addData')

describe('AscentForm', () => {
  let mockUser
  let mockAddAscent
  
  beforeEach(() => {
    mockUser = {
      name: 'T-Rex',
      email: 'chompy@yahoo.com',
      password: 'smallarms',
      id: 4
    }
    mockAddAscent = jest.fn().mockImplementation(() => true)
  })

  describe('AscentForm Component', () => {
    it('should match the snapshot for boulder', () => {
      const wrapper = shallow(<AscentForm user={mockUser} addAscent={mockAddAscent} error='' disciplineBoulder={true} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot for sport', () => {
      const wrapper = shallow(<AscentForm user={mockUser} addAscent={mockAddAscent} error='' disciplineBoulder={false} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should have the correct default local state', () => {
      const expected = {
        name: '',
        location: '',
        caption: '',
        grade: '',
        ascentAdded: false
      }
      const wrapper = shallow(<AscentForm user={mockUser} addAscent={mockAddAscent} error='' disciplineBoulder={true} />)

      expect(wrapper.state()).toEqual(expected)
    })

    it('should update state onChange of the inputs', () => {
      const expected = '7'
      const wrapper = shallow(<AscentForm user={mockUser} addAscent={mockAddAscent} error='' disciplineBoulder={true} />)
      const e = { target: { name: 'grade', value: '7' } }

      wrapper.find('#grade').simulate('change', e)

      expect(wrapper.state().grade).toEqual(expected)
    })

    it('should add an ascent with data from state', async () => {
      const wrapper = shallow(<AscentForm user={mockUser} addAscent={mockAddAscent} error='' disciplineBoulder={true} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({
        name: 'Green Lantern',
        location: 'Ute Pass, CO',
        caption: 'Some other words',
        grade: 'V11'
      })

      await wrapper.find('.ascent-form').simulate('submit', e)

      expect(wrapper.state().ascentAdded).toEqual(true)
    })

    it('should not set state if ascent is not added', async () => {
      mockAddAscent = jest.fn().mockImplementation(() => false)
      const wrapper = shallow(<AscentForm user={mockUser} addAscent={mockAddAscent} error='' disciplineBoulder={true} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({
        name: 'Green Lantern',
        location: 'Ute Pass, CO',
        caption: 'Some other words',
        grade: 'V11'
      })

      await wrapper.find('.ascent-form').simulate('submit', e)

      expect(wrapper.state().ascentAdded).toEqual(false)
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from the store', () => {
      const mockState = {
        currentUser: mockUser,
        error: ''
      }
      const expected = {
        user: mockUser,
        error: ''
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })

  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method addAscent', () => {
      const mockDispatch = jest.fn()
      const expected = addDataThunk({}, 'ascent')

      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.addAscent({}, 'ascent')

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})