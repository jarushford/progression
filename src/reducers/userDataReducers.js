export const trainingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TRAINING':
      return {...state, ...action.data}
    case 'CLEAR_WORKOUTS':
      return {}
    case 'TOGGLE_COMPLETE':
      const keys = Object.keys(state)
      return keys.reduce((acc, key) => {
        if (state[key].id === action.key) {
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
    case 'CLEAR_PROJECTS':
      return []
    default:
      return state
  }
}

export const ascentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ASCENTS':
      return [...state, ...action.data]
    case 'CLEAR_ASCENTS':
      return []
    default:
      return state
  }
}

export const milestonesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_MILESTONES':
      return [...action.data]
    case 'CLEAR_MILESTONES':
      return []
    default:
      return state
  }
}

export const journalReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_JOURNAL':
      return [...action.data]
    case 'CLEAR_JOURNAL':
      return []
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

export const currentProjectReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return action.id
    default:
      return state
  }
}