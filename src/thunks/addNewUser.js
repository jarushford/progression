import { setError } from '../actions'
import { loginUserThunk } from './loginUser'

export const addNewUserThunk = (user) => {
  return async (dispatch) => {
    try {

      let root
      if (process.env.NODE_ENV === 'development') {
        root = 'http://localhost:3000'
      } else {
        root = 'https://progression-backend.herokuapp.com'
      }

      const url = `${root}/api/progressionusers/new`
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw new Error('User already exists, try another email!')
      }
      await dispatch(loginUserThunk(user))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}