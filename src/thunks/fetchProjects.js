import { getProjects } from '../actions'

export const fetchProjectsThunk = (id) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/progressionusers/${id}/projects`
      const response = await fetch(url)
      if (!response.ok) {
        throw Error('Could not get projects')
      }
      const result = await response.json()
      dispatch(getProjects(result.data))
    } catch (error) {
      console.log(error)
    }
  }
}