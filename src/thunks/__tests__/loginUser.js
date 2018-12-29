import { setError, setUser } from '../../actions'
import { fetchDataThunk } from '../fetchData'
import { loginUserThunk } from '../loginUser'

jest.mock('../fetchData')

describe('loginUserThunk', () => {
  let mockUser
  let mockDispatch

  beforeEach(() => {
    mockUser = {
      name: 'Flanders',
      email: 'ned@lefties.net',
      password: 'Jesus',
      id: 7
    }
    mockDispatch = jest.fn()
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Incorrect email or password'
    }))

    const thunk = loginUserThunk(mockUser)

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('Incorrect email or password'))
    expect(result).toEqual(false)
  })

  it('should login user if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: mockUser
      })
    }))

    const thunk = loginUserThunk(mockUser)

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenNthCalledWith(1, setUser(mockUser))
    expect(mockDispatch).toHaveBeenNthCalledWith(2, fetchDataThunk())
    expect(mockDispatch).toHaveBeenNthCalledWith(3, fetchDataThunk())
    expect(mockDispatch).toHaveBeenNthCalledWith(4, fetchDataThunk())
    expect(result).toEqual(true)
  })
})