import React from 'react'
import { connect }  from 'react-redux';
import { withRouter } from 'react-router-dom'
import '../../main.scss'

function Training({ trainingData }) {
  const date = new Date()
  const today = 
    `${('0' + (date.getMonth() + 1)).slice(-2)}/`
      + `${('0' + (date.getDate())).slice(-2)}/`
      + `${date.getFullYear()}`
  const todayIndex = date.getDay()
  const todayM = today.substring(0, 2)
  const todayY = today.substring(6)
  const endOfMonthIndex = ['25', '26', '27', '28', '29', '30', '31', '01', '02', '03', '04', '05','06']
  const weekIndex = { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' }

  Object.keys(trainingData).forEach(key => {
    const keyM = key.substring(0, 2)
    const keyY = key.substring(6)
    if (key === today) {
      weekIndex[todayIndex] = (
        <li className="workout-item">
          <h3>{trainingData[key].type}</h3>
          <p>{trainingData[key].description}</p>
        </li>
      )
    } else if (endOfMonthIndex.includes(today.substring(3, 5))) {
      Object.assign(weekIndex, endOfMonthHelper(key, today, weekIndex, todayIndex, trainingData, endOfMonthIndex))
    } else if (keyM === todayM && keyY === todayY) {
      Object.assign(weekIndex, daysOfWeekHelper(key, today, weekIndex, todayIndex, trainingData))
    }
  })

  return (
    <section className="training-container">
      <div className="training-header">
        <h1 className="training-title">TRAINING</h1>
        <button className="add-workout">Add Workout</button>
      </div>
      <div className="training">
        <div className={`day ${highlightHelper('sunday') && 'highlighted'}`}>
          <h2>Sunday</h2>
          <ul>{weekIndex[0]}</ul>
        </div>
        <div className={`day ${highlightHelper('monday') && 'highlighted'}`}>
          <h2>Monday</h2>
          <ul>{weekIndex[1]}</ul>
        </div>
        <div
          className={`day ${highlightHelper('tuesday') && 'highlighted'}`}>
          <h2>Tuesday</h2>
          <ul>{weekIndex[2]}</ul>
        </div>
        <div className={`day ${highlightHelper('wednesday') && 'highlighted'}`}>
          <h2>Wednesday</h2>
          <ul>{weekIndex[3]}</ul>
        </div>
        <div className={`day ${highlightHelper('thursday') && 'highlighted'}`}>
          <h2>Thursday</h2>
          <ul>{weekIndex[4]}</ul>
        </div>
        <div className={`day ${highlightHelper('friday') && 'highlighted'}`}>
          <h2>Friday</h2>
          <ul>{weekIndex[5]}</ul>
        </div>
        <div className={`day ${highlightHelper('saturday') && 'highlighted'}`}>
          <h2>Saturday</h2>
          <ul>{weekIndex[6]}</ul>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  trainingData: state.trainingData
})

export default withRouter(connect(mapStateToProps)(Training))

/*******************
 PRIVATE
 *******************/

const daysOfWeekHelper = (key, today, weekIndex, todayIndex, trainingData) => {
  const keyDay = key.substring(3, 5)
  const todayDay = today.substring(3, 5)
  if (keyDay > todayDay && keyDay - todayDay <= 6 - todayIndex) {
    weekIndex[todayIndex + (keyDay - todayDay)] = (
      <li className="workout-item">
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  } else if (keyDay < todayDay && todayDay - keyDay <= todayIndex) {
    weekIndex[todayIndex - (todayDay - keyDay)] = (
      <li className="workout-item">
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  }
  return weekIndex
}

const endOfMonthHelper = (key, today, weekIndex, todayIndex, trainingData, endOfMonthIndex) => {
  const keyDay = key.substring(3, 5)
  const todayDay = today.substring(3, 5)
  const distanceUp = daysInThisMonth() - parseInt(todayDay) + parseInt(keyDay)
  const distanceDown = daysInPreviousMonth() - parseInt(keyDay) + parseInt(todayDay)
  if (keyDay < todayDay && distanceUp <= 6 - todayIndex) {
    weekIndex[parseInt(todayIndex) + parseInt(distanceUp)] = (
      <li className="workout-item">
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  } else if (keyDay > todayDay && distanceDown <= todayIndex) {
    weekIndex[parseInt(todayIndex) - parseInt(distanceDown)] = (
      <li className="workout-item">
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  }
}

const daysInThisMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
}

const daysInPreviousMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 0).getDate()
}

const highlightHelper = (day) => {
  const date = new Date()
  const todayIndex = date.getDay()
  const daysOfWeek = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  }
  if (daysOfWeek[day] === todayIndex) {
    return true
  }
  return false
}