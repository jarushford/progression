import { clearThunkHelper } from '../utils/thunkHelpers'
import { fetchDataThunk } from './fetchData'
import { setError } from '../actions'

export const updateProjectThunk = (data) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/progressionusers/${data.user_id}/projects/${data.id}`
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw Error('Could not update project')
      }

      await dispatch(clearThunkHelper('project')())
      await dispatch(fetchDataThunk(data.user_id, '', 'project'))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}