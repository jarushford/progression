export const trainingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TRAINING':
      return {...state, ...action.data}
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