import { fetchMilestonesThunk } from './fetchMilestones'
import { clearMilestones, setError } from '../actions'

export const addMilestoneThunk = (milestone) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers/milestones/new'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(milestone),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not add project')
      }
      await dispatch(clearMilestones())
      dispatch(fetchMilestonesThunk(milestone.user_id, milestone.project_id))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}