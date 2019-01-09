import React from 'react'
import { shallow } from 'enzyme'
import { clearError } from '../../../actions'
import { mapStateToProps, mapDispatchToProps, Error } from '../Error'

describe('Error', () => {
  let mockError
  let mockClear

  beforeEach(() => {
    mockError = 'Oh no!'
    mockClear = jest.fn()
  })

  it('should match the snapshot', () => {
    const wrapper = shallow(<Error error={mockError} clearError={mockClear} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should mapStateToProps with data from store', () => {
    const mockState = {
      error: 'Oh no!'
    }

    const mappedProps = mapStateToProps(mockState)

    expect(mappedProps).toEqual(mockState)
  })

  it('should mapDispatchToProps with a method clearError', () => {
    const mockDispatch = jest.fn()
    const expected = clearError()

    const mappedProps = mapDispatchToProps(mockDispatch)

    mappedProps.clearError()

    expect(mockDispatch).toBeCalledWith(expected)
  })
})