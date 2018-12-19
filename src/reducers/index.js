import { combineReducers } from 'redux';
import { trainingDataReducer, projectsReducer, ascentsReducer, disciplineReducer } from './userDataReducers'

const rootReducer = combineReducers({
  trainingData: trainingDataReducer,
  projects: projectsReducer,
  ascents: ascentsReducer,
  disciplineBoulder: disciplineReducer
})

export default rootReducer