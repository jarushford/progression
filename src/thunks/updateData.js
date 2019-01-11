import { fetchDataThunk } from './fetchData'
import { setError } from '../actions'

export const updateDataThunk = (data, type) => {
  return async (dispatch) => {
    try {
      if (type === 'workout') {
        data.completed = !data.completed
      }

      let root
      if (process.env.NODE_ENV === 'development') {
        root = 'http://localhost:3000'
      } else {
        root = 'https://progression-backend.herokuapp.com'
      }

      const url = `${root}/api/progressionusers/${data.user_id}/${type}s/${data.id}`
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