import { clearThunkHelper, fetchThunkHelper } from '../utils/thunkHelpers'
import { setError } from '../actions'

export const deleteDataThunk = (item_id, user_id, project_id, type) => {
  return async (dispatch) => {
    try {
      const data = {item_id, user_id, project_id}
      let url
      type === 'journal' || type === 'milestone'
        ? url = `http://localhost:3000/api/progressionusers/${user_id}/projects/${project_id}/${type}s/${item_id}`
        : url = `http://localhost:3000/api/progressionusers/${user_id}/${type}s/${item_id}`

      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw Error(`Could not remove ${type}`)
      }

      await dispatch(clearThunkHelper(type)())

      type === 'journal' || type === 'milestone'
        ? dispatch(fetchThunkHelper(type)(data.user_id, data.project_id))
        : dispatch(fetchThunkHelper(type)(data.user_id))

    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}