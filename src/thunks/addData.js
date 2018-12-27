import { clearThunkHelper, fetchThunkHelper } from '../utils/thunkHelpers'
import { setError } from '../actions'

export const addDataThunk = (data, type) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/progressionusers/${type}s/new`
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw Error(`Could not add ${type}`)
      }

      await dispatch(clearThunkHelper(type)())

      type === 'journal' || type === 'milestone'
        ? dispatch(fetchThunkHelper(type)(data.user_id, data.project_id))
        : dispatch(fetchThunkHelper(type)(data.user_id))

      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}