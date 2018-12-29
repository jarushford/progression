import { clearThunkHelper } from '../../utils/thunkHelpers'
import { fetchDataThunk } from '../fetchData'
import { addDataThunk } from '../addData'
import { setError } from '../../actions'

jest.mock('../fetchData')

describe('addDataThunk', () => {
  let mockData
  let mockType
  let mockDispatch

  beforeEach(() => {
    mockData = {
      name: 'Big Worm',
      grade: 'V14',
      location: 'Mt. Evans',
      user_id: 2
    }
    mockType = 'ascent'
    mockDispatch = jest.fn()
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Could not add ascent'
    }))

    const thunk = addDataThunk(mockData, mockType)

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Could not add ascent'))
    expect(result).toEqual(false)
  })

  it('should add data and fetch updates if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = addDataThunk(mockData, mockType)

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenNthCalledWith(1, clearThunkHelper('ascent')())
    expect(mockDispatch).toHaveBeenNthCalledWith(2, fetchDataThunk())
    expect(result).toEqual(true)
  })

  it('should add data and fetch updates if response is ok and type is journal', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = addDataThunk(mockData, 'journal')

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenNthCalledWith(1, clearThunkHelper('journal')())
    expect(mockDispatch).toHaveBeenNthCalledWith(2, fetchDataThunk())
    expect(result).toEqual(true)
  })
})