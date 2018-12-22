export const trainingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TRAINING':
      return {...state, ...action.data}
    case 'TOGGLE_COMPLETE':
      const keys = Object.keys(state)
      return keys.reduce((acc, key) => {
        if (key === action.key) {
          acc[key] = {...state[key], completed: !state[key].completed}
        } else {
          acc[key] = state[key]
        }
        return acc
      }, {})
    default:
      return state
  }
}

export const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROJECTS':
      return [...state, ...action.data]
    default:
      return state
  }
}

export const ascentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ASCENTS':
      return [...state, ...action.data]
    default:
      return state
  }
}

export const disciplineReducer = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_DISCIPLINE':
      return action.discipline
    default:
      return state
  }
}