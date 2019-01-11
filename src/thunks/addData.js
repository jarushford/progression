import { clearThunkHelper } from '../utils/thunkHelpers'
import { fetchDataThunk } from './fetchData'
import { setError } from '../actions'

export const addDataThunk = (data, type) => {
  return async (dispatch) => {
    try {

      let root
      if (process.env.NODE_ENV === 'development') {
        root = 'http://localhost:3000'
      } else {
        root = 'https://progression-backend.herokuapp.com'
      }
      const url = `${root}/api/progressionusers/${type}s/new`
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
        ? dispatch(fetchDataThunk(data.user_id, data.project_id, type))
        : dispatch(fetchDataThunk(data.user_id, '', type))

      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}