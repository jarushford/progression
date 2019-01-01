import * as ACTIONS from '../index'

describe('ACTIONS', () => {
  it('should return workouts when getTraining is called', () => {
    const data = {
      '12/12/12': { date: '12/12/12', description: 'core' }
    }
    const expected = {
      type: 'GET_TRAINING',
      data
    }
    const result = ACTIONS.getTraining(data)

    expect(result).toEqual(expected)
  })

  it('should return a type of CLEAR_WORKOUTS when clearWorkouts is called', () => {
    const expected = { type: 'CLEAR_WORKOUTS' }

    const result = ACTIONS.clearWorkouts()

    expect(result).toEqual(expected)
  })

  it('should return GET_PROJECTS and data when getProjects is called', () => {
    const data = [
      {
        name: 'Big Worm',
        grade: 'V14',
        location: 'Mt. Evans'
      }
    ]
    const expected = {
      type: 'GET_PROJECTS',
      data
    }

    const result = ACTIONS.getProjects(data)

    expect(result).toEqual(expected)
  })

  it('should return CLEAR_PROJECTS when clearProjects is called', () => {
    const expected = { type: 'CLEAR_PROJECTS' }

    const result = ACTIONS.clearProjects()

    expect(result).toEqual(expected)
  })

  it('should return GET_ASCENTS and data when getAscents is called', () => {
    const data = [
      {
        name: 'Big Worm',
        grade: 'V14',
        location: 'Mt. Evans'
      }
    ]
    const expected = {
      type: 'GET_ASCENTS',
      data
    }

    const result = ACTIONS.getAscents(data)

    expect(result).toEqual(expected)
  })

  it('should return CLEAR_ASCENTS when clearAscents is called', () => {
    const expected = { type: 'CLEAR_ASCENTS' }

    const result = ACTIONS.clearAscents()

    expect(result).toEqual(expected)
  })

  it('should return GET_MILESTONES and data when getMilestones is called', () => {
    const data = [
      { date: '1/1/14', caption: 'Did the things!' }
    ]
    const expected = {
      type: 'GET_MILESTONES',
      data
    }

    const result = ACTIONS.getMilestones(data)

    expect(result).toEqual(expected)
  })

  it('should return CLEAR_MILESTONES when clearMilestones is called', () => {
    const expected = { type: 'CLEAR_MILESTONES' }

    const result = ACTIONS.clearMilestones()

    expect(result).toEqual(expected)
  })

  it('should return GET_JOURNAL and data when getJournal is called', () => {
    const data = [
      { date: '1/3/56', entry: 'Some stuff about things' }
    ]
    const expected = {
      type: 'GET_JOURNAL',
      data
    }

    const result = ACTIONS.getJournal(data)

    expect(result).toEqual(expected)
  })

  it('should return CLEAR_JOURNAL when clearJournal is called', () => {
    const expected = { type: 'CLEAR_JOURNAL' }

    const result = ACTIONS.clearJournal()

    expect(result).toEqual(expected)
  })

  it('should return TOGGLE_DISCIPLINE and a boolean when toggleDiscipline is called', () => {
    const discipline = false
    const expected = {
      type: 'TOGGLE_DISCIPLINE',
      discipline
    }

    const result = ACTIONS.toggleDiscipline(discipline)

    expect(result).toEqual(expected)
  })

  it('should set a user with the logged in user when setUser is called', () => {
    const user = {
      name: 'Dwayne',
      email: 'theRock@johnson.com',
      password: 'theRock'
    }
    const expected = {
      type: 'SET_USER',
      user
    }

    const result = ACTIONS.setUser(user)

    expect(result).toEqual(expected)
  })

  it('should return LOGOUT_USER when logoutUser is called', () => {
    const expected = { type: 'LOGOUT_USER' }

    const result = ACTIONS.logoutUser()

    expect(result).toEqual(expected)
  })

  it('should return SET_ERROR and a message when setError is called', () => {
    const error = 'Oh no!'
    const expected = {
      type: 'SET_ERROR',
      error
    }

    const result = ACTIONS.setError(error)

    expect(result).toEqual(expected)
  })

  it('should return CLEAR_ERROR when clearError is called', () => {
    const expected = { type: 'CLEAR_ERROR' }

    const result = ACTIONS.clearError()

    expect(result).toEqual(expected)
  })

  it('should SET_CURRENT_PROJECT when setCurrentProject is called', () => {
    const id = 3
    const expected = {
      type: 'SET_CURRENT_PROJECT',
      id
    }

    const result = ACTIONS.setCurrentProject(id)

    expect(result).toEqual(expected)
  })
})





