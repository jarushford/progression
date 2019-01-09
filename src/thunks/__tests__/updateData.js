import { setError } from '../../actions'
import { fetchDataThunk } from '../fetchData'
import { updateDataThunk } from '../updateData'

jest.mock('../fetchData')

describe('updateDataThunk', () => {
  let mockDispatch
  let mockData

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockData = {
      completed: false
    }
  })

  it('should throw an error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Could not update workout'
    }))

    const thunk = updateDataThunk(mockData, 'workout')

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Could not update workout'))
    expect(result).toEqual(false)
  })

  it('should update and fetch updated data if successful', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = updateDataThunk(mockData, 'project')

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(fetchDataThunk())
    expect(result).toEqual(true)
  })
})