import { fetchWorkoutsThunk } from './fetchWorkouts'
import { clearWorkouts, setError } from '../actions'

export const addWorkoutThunk = (workout) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers/workouts/new'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not add workout')
      }
      await dispatch(clearWorkouts())
      dispatch(fetchWorkoutsThunk(workout.user_id))
      return true
    } catch (error) {
      dispatch(setError(error.message))
      return false
    }
  }
}