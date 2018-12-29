import { loginUserThunk } from '../loginUser'
import { addNewUserThunk } from '../addNewUser'
import { setError } from '../../actions'

jest.mock('../loginUser')

describe('addNewUserThunk', () => {
  let mockUser
  let mockDispatch

  beforeEach(() => {
    mockUser = {
      name: 'Bjorn',
      email: 'bjorn@place.com',
      password: 'bjornofcourse'
    }
    mockDispatch = jest.fn()
  })

  it('should throw an error if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'User already exists, try another email!'
    }))

    const thunk = addNewUserThunk(mockUser)

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toBeCalledWith(setError('User already exists, try another email!'))
    expect(result).toEqual(false)
  })

  it('should add user and fetch updates if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = addNewUserThunk(mockUser)

    const result = await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(loginUserThunk())
    expect(result).toEqual(true)
  })
})