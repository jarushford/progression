import { getAscents, setError } from '../actions'

export const fetchAscentsThunk = (id) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/progressionusers/${id}/ascents`
      const response = await fetch(url)
      if (!response.ok) {
        throw Error('Could not get ascents')
      }
      const result = await response.json()
      dispatch(getAscents(result.data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}