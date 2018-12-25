import { setError, setUser } from '../actions'
import { fetchAscentsThunk } from './fetchAscents'
import { fetchProjectsThunk } from './fetchProjects'
import { fetchWorkoutsThunk } from './fetchWorkouts'

export const loginUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers'
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
      await dispatch(fetchAscentsThunk(currentUser.id))
      await dispatch(fetchProjectsThunk(currentUser.id))
      await dispatch(fetchWorkoutsThunk(currentUser.id))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}