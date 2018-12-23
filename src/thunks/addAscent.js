export const addAscentThunk = (ascent) => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3000/api/progressionusers/ascents/new'
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(ascent),
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}