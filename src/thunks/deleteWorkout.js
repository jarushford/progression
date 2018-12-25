import { fetchWorkoutsThunk } from './fetchWorkouts'
import { clearWorkouts } from '../actions'

export const deleteWorkoutThunk = (workout_id, id) => {
  return async (dispatch) => {
    try {
      const data = {workout_id, id}
      const url = `http://localhost:3000/api/progressionusers/${id}/workouts/${workout_id}`
      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!response.ok) {
        throw Error('Could not remove workout')
      }
      await dispatch(clearWorkouts())
      dispatch(fetchWorkoutsThunk(id))
    } catch (error) {
      console.log(error)
    }
  }
}