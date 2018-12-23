import { getTraining } from '../actions'

export const fetchWorkoutsThunk = (id) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3000/api/progressionusers/${id}/workouts`
      const response = await fetch(url)
      if (!response.ok) {
        throw Error('Could not get workouts')
      }
      const result = await response.json()
      dispatch(getTraining(result.data))
    } catch (error) {
      console.log(error)
    }
  }
}