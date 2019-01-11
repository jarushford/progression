import { setError } from '../actions'
import { getThunkHelper, clearThunkHelper } from '../utils/thunkHelpers'


export const fetchDataThunk = (id, project_id, type) => {
  return async (dispatch) => {
    try {
      let url
      
      type === 'journal' || type === 'milestone'
        ? url = `https://progression-backend.herokuapp.com/api/progressionusers/${id}/projects/${project_id}/${type}s`
        : url = `https://progression-backend.herokuapp.com/api/progressionusers/${id}/${type}s`

      const response = await fetch(url)
      if (!response.ok) {
        throw Error(`Could not get ${type}`)
      }
      const result = await response.json()
      await dispatch(clearThunkHelper(type)())
      dispatch(getThunkHelper(type)(result.data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}