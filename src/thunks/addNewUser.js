import { setError } from '../actions'
import { loginUserThunk } from './loginUser'

export const addNewUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const url = `https://progression-backend.herokuapp.com/api/progressionusers/new`
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