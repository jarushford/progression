import { setError, setUser } from '../actions'
import { fetchDataThunk } from './fetchData'

export const loginUserThunk = (user) => {
  return async (dispatch) => {
    try {
      
      let root
      if (process.env.NODE_ENV === 'development') {
        root = 'http://localhost:3000'
      } else {
        root = 'https://progression-backend.herokuapp.com'
      }

      const url = `${root}/api/progressionusers`
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