import { setError } from '../actions'
import { getThunkHelper, clearThunkHelper } from '../utils/thunkHelpers'


export const fetchDataThunk = (id, project_id, type) => {
  return async (dispatch) => {
    try {
      let url
      type === 'journal' || type === 'milestone'
        ? url = `http://localhost:3000/api/progressionusers/${id}/projects/${project_id}/${type}s`
        : url = `http://localhost:3000/api/progressionusers/${id}/${type}s`

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