import { clearThunkHelper } from '../../utils/thunkHelpers'
import { fetchDataThunk } from '../fetchData'
import { deleteDataThunk } from '../deleteData'
import { setError } from '../../actions'

jest.mock('../fetchData')

describe('deleteDataThunk', () => {
  let mockItem
  let mockUser
  let mockProj
  let mockDispatch

  beforeEach(() => {
    mockItem = 1
    mockUser = 3
    mockProj = 5
    mockDispatch = jest.fn()
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Could not remove project'
    }))

    const thunk = deleteDataThunk(mockItem, mockUser, mockProj, 'project')

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Could not remove project'))
    expect(result).toEqual(false)
  })

  it('should delete item if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = deleteDataThunk(mockItem, mockUser, mockProj, 'project')

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenNthCalledWith(1, clearThunkHelper('project')())
    expect(mockDispatch).toHaveBeenNthCalledWith(2, fetchDataThunk())
  })

  it('should delete item when type is journal', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = deleteDataThunk(mockItem, mockUser, mockProj, 'journal')

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenNthCalledWith(1, clearThunkHelper('journal')())
    expect(mockDispatch).toHaveBeenNthCalledWith(2, fetchDataThunk())
  })
})