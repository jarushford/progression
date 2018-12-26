import { getMilestones, setError } from '../actions'

export const fetchMilestonesThunk = (id, project_id) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/progressionusers/${id}/projects/${project_id}/milestones`
      const response = await fetch(url)
      if (!response.ok) {
        throw Error('Could not get milestones')
      }
      console.log(response)
      const result = await response.json()
      dispatch(getMilestones(result.data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}