import { fetchAscentsThunk } from './fetchAscents'
import { clearAscents, setError } from '../actions'

export const addAscentThunk = (ascent) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers/ascents/new'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(ascent),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not add ascent')
      }
      await dispatch(clearAscents())
      dispatch(fetchAscentsThunk(ascent.user_id))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}