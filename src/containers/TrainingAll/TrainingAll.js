import React from 'react'
import { connect }  from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { toggleComplete } from '../../actions'
import { uid } from 'react-uid'
import '../../main.scss'

function TrainingAll({ trainingDataUnclean, toggleComplete }) {
  let trainingRender = <div></div>
  if (Object.keys(trainingDataUnclean).length) {
    const keys = Object.keys(trainingDataUnclean)
    const trainingData = keys.reduce((data, workout) => {
      data[trainingDataUnclean[workout].workout_date] = trainingDataUnclean[workout]
      return data
    }, {})
    const trainingKeys = Object.keys(trainingData).sort()
    trainingRender = trainingKeys.map(workout => {
      const key = uid(trainingData[workout])
      return (
          <article className={`project ${trainingData[workout].completed && 'completed'}`} key={key} onClick={() => toggleComplete(workout)}>
            <div>
              <h2 className="project-name">{workout}</h2>
              <h5 className="project-grade">{trainingData[workout].type}</h5>
            </div>
            <h5 className="project-location">{trainingData[workout].description}</h5>
          </article>
      )
    })
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

const mapStateToProps = (state) => ({
  trainingDataUnclean: state.trainingData
})

const mapDispatchToProps = (dispatch) => ({
  toggleComplete: (key) => dispatch(toggleComplete(key))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainingAll))