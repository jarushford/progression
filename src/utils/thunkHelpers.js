import { clearAscents, clearProjects, clearWorkouts, clearJournal, clearMilestones, getAscents, getProjects, getTraining, getJournal, getMilestones } from '../actions'


export const clearThunkHelper = (type) => {
  const helper = {
    ascent: clearAscents,
    project: clearProjects,
    workout: clearWorkouts,
    journal: clearJournal,
    milestone: clearMilestones
  }
  return helper[type]
}

export const getThunkHelper = (type) => {
  const helper = {
    ascent: getAscents,
    project: getProjects,
    workout: getTraining,
    journal: getJournal,
    milestone: getMilestones
  }
  return helper[type]
}