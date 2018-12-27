import { fetchMilestonesThunk } from './fetchMilestones'
import { clearMilestones, setError } from '../actions'

export const deleteMilestoneThunk = (id, project_id, user_id) => {
  return async (dispatch) => {
    try {
      const data = {id, user_id, project_id}
      const url = `http://localhost:3000/api/progressionusers/${user_id}/projects/${project_id}/milestones/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not remove project')
      }
      await dispatch(clearMilestones())
      dispatch(fetchMilestonesThunk(user_id, project_id))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}