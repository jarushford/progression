import React from 'react'
import { shallow } from 'enzyme'
import { mapStateToProps, Ascents } from '../Ascents'

describe('Ascents', () => {
    let mockUser
    let mockAscents

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
          grade: 'V13'
        },
        {
          name: 'Megalodon',
          location: 'Newlin, CO',
          grade: 'V7'
        },
        {
          name: 'Sabretooth',
          location: 'Thunder Ridge, CO',
          grade: 'V13'
        }
      ]
    })

  describe('Ascents Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Ascents user={mockUser} ascents={mockAscents} disciplineBoulder={true} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no user', () => {
      const noUser = { name: '', email: '', password: '' }
      const wrapper = shallow(<Ascents user={noUser}ascents={mockAscents} disciplineBoulder={true} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with no ascents', () => {
      const noAscents = []
      const wrapper = shallow(<Ascents user={mockUser} ascents={noAscents} disciplineBoulder={true} />)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = {
        currentUser: mockUser,
        ascents: mockAscents
      }
      const expected = {
        user: mockUser,
        ascents: mockAscents
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })
})