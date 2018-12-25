import { fetchAscentsThunk } from './fetchAscents'
import { clearAscents, setError } from '../actions'

export const deleteAscentThunk = (ascent_id, id) => {
  return async (dispatch) => {
    try {
      const data = {ascent_id, id}
      const url = `http://localhost:3000/api/progressionusers/${id}/ascents/${ascent_id}`
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not remove ascent')
      }
      await dispatch(clearAscents())
      dispatch(fetchAscentsThunk(id))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}