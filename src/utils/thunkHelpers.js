import { clearAscents, clearProjects, clearWorkouts, clearJournal, clearMilestones } from '../actions'
import { fetchAscentsThunk } from '../thunks/fetchAscents';
import { fetchProjectsThunk } from '../thunks/fetchProjects';
import { fetchWorkoutsThunk } from '../thunks/fetchWorkouts';
import { fetchJournalThunk } from '../thunks/fetchJournal';
import { fetchMilestonesThunk } from '../thunks/fetchMilestones';

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

export const fetchThunkHelper = (type) => {
  const helper = {
    ascent: fetchAscentsThunk,
    project: fetchProjectsThunk,
    workout: fetchWorkoutsThunk,
    journal: fetchJournalThunk,
    milestone: fetchMilestonesThunk
  }
  return helper[type]
}