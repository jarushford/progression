export const getTrainingData = (data) => ({
  type: 'GET_TRAINING',
  data
})

export const getProjects = (data) => ({
  type: 'GET_PROJECTS',
  data
})

export const clearProjects = () => ({
  type: 'CLEAR_PROJECTS'
})

export const getAscents = (data) => ({
  type: 'GET_ASCENTS',
  data
})

export const clearAscents = () => ({
  type: 'CLEAR_ASCENTS'
})

export const toggleDiscipline = (discipline) => ({
  type: 'TOGGLE_DISCIPLINE',
  discipline
})

export const setUser = (user) => ({
  type: 'SET_USER',
  user
})

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export const toggleComplete = (key) => ({
  type: 'TOGGLE_COMPLETE',
  key
})
