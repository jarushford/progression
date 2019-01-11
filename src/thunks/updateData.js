import { fetchDataThunk } from './fetchData'
import { setError } from '../actions'

export const updateDataThunk = (data, type) => {
  return async (dispatch) => {
    try {
      if (type === 'workout') {
        data.completed = !data.completed
      }

      const url = `https://progression-backend.herokuapp.com/api/progressionusers/${data.user_id}/${type}s/${data.id}`
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw Error(`Could not update ${type}`)
      }

      await dispatch(fetchDataThunk(data.user_id, '', type))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}