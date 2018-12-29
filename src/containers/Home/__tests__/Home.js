import React from 'react'
import { shallow } from 'enzyme'
import { toggleDiscipline } from '../../../actions'
import { mapStateToProps, mapDispatchToProps, Home } from '../Home'

describe('Home', () => {
  let discipline
  let mockToggle

  beforeEach(() => {
    discipline = true
    mockToggle = jest.fn()
  })

  describe('Home Component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Home disciplineBoulder={discipline} toggleDiscipline={mockToggle} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot with discipline false', () => {
      const wrapper = shallow(<Home disciplineBoulder={!discipline} toggleDiscipline={mockToggle} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should toggle discipline when each input is clicked', () => {
      const wrapper = shallow(<Home disciplineBoulder={discipline} toggleDiscipline={mockToggle} />)

      wrapper.find('#sport').simulate('click')
      expect(mockToggle).toBeCalledWith(false)

      wrapper.find('#boulder').simulate('click')
      expect(mockToggle).toBeCalledWith(true)
    })
  })

  describe('mapStateToProps', () => {
    it('should return a props object with data from store', () => {
      const mockState = { disciplineBoulder: true }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(mockState)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return a props object with a method toggleDiscipline', () => {
      const mockDispatch = jest.fn()
      const expected = toggleDiscipline(false)

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.toggleDiscipline(false)

      expect(mockDispatch).toBeCalledWith(expected)
    })
  })
})