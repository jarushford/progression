import React from 'react'
import { shallow } from 'enzyme'
import { deleteDataThunk } from '../../../thunks/deleteData'
import { mapDispatchToProps, Journal } from '../Journal'

jest.mock('../../../thunks/deleteData')

describe('Journal', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Journal />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should delete an entry on click', () => {
    const mockDelete = jest.fn()
    const wrapper = shallow(<Journal deleteJournal={mockDelete} id={1} project_id={2} user_id={4} />)

    wrapper.find('.fa-times').simulate('click')

    expect(mockDelete).toBeCalledWith(1, 4, 2, 'journal')
  })

  it('should return a props object with a method deleteJournal', () => {
    const mockDispatch = jest.fn()
    const expected = deleteDataThunk(1, 2, 3, 'journal')

    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.deleteJournal(1, 2, 3, 'journal')

    expect(mockDispatch).toBeCalledWith(expected)
  })
})