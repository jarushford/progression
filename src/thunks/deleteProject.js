import { fetchProjectsThunk } from './fetchProjects'
import { clearProjects, setError } from '../actions'

export const deleteProjectThunk = (project_id, id) => {
  return async (dispatch) => {
    try {
      const data = {project_id, id}
      const url = `http://localhost:3000/api/progressionusers/${id}/projects/${project_id}`
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
      await dispatch(clearProjects())
      dispatch(fetchProjectsThunk(id))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}