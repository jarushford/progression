import React from 'react'
import { deleteDataThunk } from '../../thunks/deleteData'
import { updateDataThunk } from '../../thunks/updateData'
import { Link } from 'react-router-dom'
import { connect }  from 'react-redux'
import PropTypes from 'prop-types'
import { uid } from 'react-uid'
import '../../main.scss'

export function TrainingAll({ trainingDataUnclean, toggleComplete, user, deleteWorkout }) {
  let trainingRender

  if (!user.name) {
    return <h1 className="no-user-msg">Log in or sign up to view workouts</h1>
  }

  if (Object.keys(trainingDataUnclean).length) {
    const keys = Object.keys(trainingDataUnclean)
    const trainingData = keys.reduce((data, workout) => {
      data[trainingDataUnclean[workout].id] = trainingDataUnclean[workout]
      return data
    }, {})
    const trainingKeys = Object.keys(trainingData).sort()
    trainingRender = trainingKeys.sort((a, b) => {
      return trainingData[a].workout_date > trainingData[b].workout_date
        ? a - b : b - a
    }).map(workout => {
        const key = uid(trainingData[workout])
        return (
            <article className={`project ${trainingData[workout].completed && 'completed'}`} key={key} onClick={() => toggleComplete(trainingData[workout], 'workout')}>
              <div>
                <h2 className="project-name">{trainingData[workout].workout_date}</h2>
                <h5 className="project-grade">{trainingData[workout].type}</h5>
              </div>
              <h5 className="project-location">{trainingData[workout].description}</h5>
              <i className="fas fa-times" onClick={() => deleteWorkout(trainingData[workout].id, user.id, null, 'workout')}></i>
            </article>
        )
      })
  } else {
    trainingRender = <h1 className="no-data-msg">You have no saved workouts</h1>
  }

  return (
    <section className="projects workout">
      <div className="projects-header workout">
        <h1 className="projects-title workout">ALL WORKOUTS</h1>
        <div className="buttons">
          <Link to='/training'>
            <button className="view-workouts">Back To Calendar</button>
          </Link>
          <Link to='/training/add'>
            <button className="add-workout">Add Workout</button>
          </Link>
        </div>
      </div>
      {trainingRender}
    </section>
  )
}

export const mapStateToProps = (state) => ({
  trainingDataUnclean: state.trainingData,
  user: state.currentUser
})

export const mapDispatchToProps = (dispatch) => ({
  toggleComplete: (workout, type) => dispatch(updateDataThunk(workout, type)),
  deleteWorkout: (item_id, user_id, project_id, type) => dispatch(deleteDataThunk(item_id, user_id, project_id, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainingAll)

TrainingAll.propTypes = {
  trainingDataUnclean: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired
}