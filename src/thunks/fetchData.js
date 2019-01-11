import { setError } from '../actions'
import { getThunkHelper, clearThunkHelper } from '../utils/thunkHelpers'


export const fetchDataThunk = (id, project_id, type) => {
  return async (dispatch) => {
    try {
      let url
      let root
      if (process.env.NODE_ENV === 'development') {
        root = 'http://localhost:3000'
      } else {
        root = 'https://progression-backend.herokuapp.com'
      }

      type === 'journal' || type === 'milestone'
        ? url = `${root}/api/progressionusers/${id}/projects/${project_id}/${type}s`
        : url = `${root}/api/progressionusers/${id}/${type}s`

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