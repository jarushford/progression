import React from 'react'
import { shallow } from 'enzyme'
import { deleteDataThunk } from '../../../thunks/deleteData'
import { mapStateToProps, mapDispatchToProps, GradeSection } from '../GradeSection'

jest.mock('../../../thunks/deleteData')

describe('GradeSection', () => {
  let mockUser
  let mockAscents
  let mockDeleteAscent

  beforeEach(() => {
    mockUser = {
      name: 'Groot',
      email: 'groot@groot.groot',
      password: 'iamgroot',
      id: 3
    }
    mockAscents = [
      {
        name: 'Top Notch',
        location: 'RMNP, CO',
        grade: 'V13',
        id: 1
      },
      {
        name: 'Megalodon',
        location: 'Newlin, CO',
        grade: 'V7',
        id: 2
      },
      {
        name: 'Sabretooth',
        location: 'Thunder Ridge, CO',
        grade: 'V13',
        id: 3
      }
    ]
    mockDeleteAscent = jest.fn()
  })
  
  describe('GradeSection Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<GradeSection user={mockUser} ascents={mockAscents} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should delete an ascent on clicking delete', () => {
      const wrapper = shallow(<GradeSection user={mockUser} ascents={mockAscents} deleteAscent={mockDeleteAscent} />)

      wrapper.find('.fa-times').first().simulate('click')

      expect(mockDeleteAscent).toBeCalledWith(1, 3, null, 'ascent')
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

  describe('mapDispatchToProps', () => [
    it('should return a props object with a method deleteAscent', () => {
      const mockDispatch = jest.fn()
      const expected = deleteDataThunk()

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.deleteAscent()

      expect(mockDispatch).toBeCalledWith(expected)
    })
  ])
})