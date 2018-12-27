import { getJournal, setError } from '../actions'

export const fetchJournalThunk = (id, project_id) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/progressionusers/${id}/projects/${project_id}/journal`
      const response = await fetch(url)
      if (!response.ok) {
        throw Error('Could not get journal')
      }
      const result = await response.json()
      dispatch(getJournal(result.data))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }
}