import { getThunkHelper, clearThunkHelper } from '../../utils/thunkHelpers'
import { fetchDataThunk } from '../fetchData'
import { setError } from '../../actions'

describe('fetchDataThunk', () => {
  let mockDispatch

  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Could not get ascent'
    }))

    const thunk = fetchDataThunk(1, 2, 'ascent')

    await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Could not get ascent'))
  })

  it('should get data if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: [{ name: 'Top Notch', grade: 'V13' }]
      })
    }))

    const thunk = fetchDataThunk(1, 2, 'ascent')

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenNthCalledWith(1, clearThunkHelper('ascent')())
    expect(mockDispatch).toHaveBeenNthCalledWith(2, getThunkHelper('ascent')([{ name: 'Top Notch', grade: 'V13' }]))
  })

  it('should get data if type is milestone and response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: [{ caption: 'Did the thing!' }]
      })
    }))

    const thunk = fetchDataThunk(1, 2, 'milestone')

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenNthCalledWith(1, clearThunkHelper('milestone')())
    expect(mockDispatch).toHaveBeenNthCalledWith(2, getThunkHelper('milestone')([{ caption: 'Did the thing!' }]))
  })
})