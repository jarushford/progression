import { setError, setUser } from '../actions'
import { fetchDataThunk } from './fetchData'

export const loginUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const url = `https://progression-backend.herokuapp.com/api/progressionusers`
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Incorrect email or password')
      }
      const result = await response.json()
      const currentUser = result.data
      dispatch(setUser(currentUser))
      await dispatch(fetchDataThunk(currentUser.id, '', 'ascent'))
      await dispatch(fetchDataThunk(currentUser.id, '', 'project'))
      await dispatch(fetchDataThunk(currentUser.id, '', 'workout'))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}