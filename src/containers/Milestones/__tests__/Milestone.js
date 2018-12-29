import React from 'react'
import { shallow } from 'enzyme'
import { deleteDataThunk } from '../../../thunks/deleteData'
import { mapDispatchToProps, Milestone } from '../Milestone'

jest.mock('../../../thunks/deleteData')

describe('Milestone', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Milestone />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should delete an entry on click', () => {
    const mockDelete = jest.fn()
    const wrapper = shallow(<Milestone deleteMilestone={mockDelete} id={1} project_id={2} user_id={4} />)

    wrapper.find('.fa-times').simulate('click')

    expect(mockDelete).toBeCalledWith(1, 4, 2, 'milestone')
  })

  it('should return a props object with a method deleteMilestone', () => {
    const mockDispatch = jest.fn()
    const expected = deleteDataThunk(1, 2, 3, 'milestone')

    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.deleteMilestone(1, 2, 3, 'milestone')

    expect(mockDispatch).toBeCalledWith(expected)
  })
})