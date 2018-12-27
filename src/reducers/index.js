import { combineReducers } from 'redux';
import { trainingDataReducer, projectsReducer, ascentsReducer, disciplineReducer, currentProjectReducer, milestonesReducer, journalReducer } from './userDataReducers'
import { currentUserReducer } from './currentUserReducer'
import { errorReducer } from './errorReducer'

const rootReducer = combineReducers({
  trainingData: trainingDataReducer,
  projects: projectsReducer,
  ascents: ascentsReducer,
  disciplineBoulder: disciplineReducer,
  currentUser: currentUserReducer,
  error: errorReducer,
  currentProject: currentProjectReducer,
  milestones: milestonesReducer,
  journal: journalReducer
})

export default rootReducer