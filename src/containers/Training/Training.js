import React from 'react'
import { connect }  from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import * as Helper from '../../utils/calendarHelpers'
import { updateDataThunk } from '../../thunks/updateData'
import '../../main.scss'
const uuidv1 = require('uuid/v1')

export function Training({ trainingDataUnclean, toggleComplete, user }) {

  if (!user.name) {
    return <h1 className="no-user-msg">Log in or sign up to add workouts</h1>
  }

  const weekIndex = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }

  if (Object.keys(trainingDataUnclean).length) {
    const keys = Object.keys(trainingDataUnclean)
    const trainingData = keys.reduce((data, workout) => {
      data.push(trainingDataUnclean[workout])
      return data
    }, [])
    const date = new Date()
    const today = 
      `${('0' + (date.getMonth() + 1)).slice(-2)}/`
        + `${('0' + (date.getDate())).slice(-2)}/`
        + `${date.getFullYear()}`
    const todayIndex = date.getDay()
    const todayM = today.substring(0, 2)
    const todayY = today.substring(6)
    const endOfMonthIndex = ['25', '26', '27', '28', '29', '30', '31', '01', '02', '03', '04', '05','06']

    trainingData.forEach(id => {
      const key = id.workout_date
      const keyM = key.substring(0, 2)
      const keyY = key.substring(6)
      if (key === today) {
        weekIndex[todayIndex].push(
          <li className={`workout-item ${id.completed && 'completed'}`} onClick={() => toggleComplete(id, 'workout')} key={uuidv1()}>
            <h3>{id.type}</h3>
            <p>{id.description}</p>
          </li>
        )
      } else if (endOfMonthIndex.includes(today.substring(3, 5))) {
        Object.assign(weekIndex, Helper.endOfMonthHelper(id, key, today, weekIndex, todayIndex, trainingData, toggleComplete))
      } else if (keyM === todayM && keyY === todayY) {
        Object.assign(weekIndex, Helper.daysOfWeekHelper(id, key, today, weekIndex, todayIndex, trainingData, toggleComplete))
      }
    })
  }

  return (
    <section className="training-container">
      <div className="training-header">
        <h1 className="training-title">TRAINING</h1>
        <div className="buttons">
          <Link to='/training/all'>
            <button className="view-workouts">View All Workouts</button>
          </Link>
          <Link to='/training/add'>
            <button className="add-workout">Add Workout</button>
          </Link>
        </div>
      </div>
      <div className="training">
        <div className={`day ${Helper.highlightHelper('sunday') && 'highlighted'}`}>
          <h2>Sunday {Helper.dateHelper(0)}</h2>
          <ul>{weekIndex[0].map(li => li)}</ul>
        </div>
        <div className={`day ${Helper.highlightHelper('monday') && 'highlighted'}`}>
          <h2>Monday {Helper.dateHelper(1)}</h2>
          <ul>{weekIndex[1].map(li => li)}</ul>
        </div>
        <div
          className={`day ${Helper.highlightHelper('tuesday') && 'highlighted'}`}>
          <h2>Tuesday {Helper.dateHelper(2)}</h2>
          <ul>{weekIndex[2].map(li => li)}</ul>
        </div>
        <div className={`day ${Helper.highlightHelper('wednesday') && 'highlighted'}`}>
          <h2>Wednesday {Helper.dateHelper(3)}</h2>
          <ul>{weekIndex[3].map(li => li)}</ul>
        </div>
        <div className={`day ${Helper.highlightHelper('thursday') && 'highlighted'}`}>
          <h2>Thursday {Helper.dateHelper(4)}</h2>
          <ul>{weekIndex[4].map(li => li)}</ul>
        </div>
        <div className={`day ${Helper.highlightHelper('friday') && 'highlighted'}`}>
          <h2>Friday {Helper.dateHelper(5)}</h2>
          <ul>{weekIndex[5].map(li => li)}</ul>
        </div>
        <div className={`day ${Helper.highlightHelper('saturday') && 'highlighted'}`}>
          <h2>Saturday {Helper.dateHelper(6)}</h2>
          <ul>{weekIndex[6].map(li => li)}</ul>
        </div>
      </div>
    </section>
  )
}

export const mapStateToProps = (state) => ({
  trainingDataUnclean: state.trainingData,
  user: state.currentUser
})

export const mapDispatchToProps = (dispatch) => ({
  toggleComplete: (workout, type) => dispatch(updateDataThunk(workout, type))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Training))
