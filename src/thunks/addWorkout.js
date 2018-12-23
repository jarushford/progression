import { fetchWorkoutsThunk } from './fetchWorkouts'
import { clearWorkouts } from '../actions'

export const addWorkoutThunk = (workout) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers/workouts/new'
      console.log(workout)
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
    } catch (error) {
      console.log(error)
    }
  }
}