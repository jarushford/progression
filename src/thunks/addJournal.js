import { fetchJournalThunk } from './fetchJournal'
import { clearJournal, setError } from '../actions'

export const addJournalThunk = (entry) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers/journal/new'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(entry),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not add entry')
      }
      await dispatch(clearJournal())
      dispatch(fetchJournalThunk(entry.user_id, entry.project_id))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}