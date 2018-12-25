import { fetchProjectsThunk } from './fetchProjects'
import { clearProjects, setError } from '../actions'

export const addProjectThunk = (project) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers/projects/new'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not add project')
      }
      await dispatch(clearProjects())
      dispatch(fetchProjectsThunk(project.user_id))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}