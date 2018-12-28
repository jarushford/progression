import React from 'react'

export const daysOfWeekHelper = (key, today, weekIndex, todayIndex, trainingData, toggleComplete) => {
  const keyDay = key.substring(3, 5)
  const todayDay = today.substring(3, 5)
  if (keyDay > todayDay && keyDay - todayDay <= 6 - todayIndex) {
    weekIndex[todayIndex + (keyDay - todayDay)] = (
      <li className={`workout-item ${trainingData[key].completed && 'completed'}`} onClick={() => toggleComplete(key)}>
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  } else if (keyDay < todayDay && todayDay - keyDay <= todayIndex) {
    weekIndex[todayIndex - (todayDay - keyDay)] = (
      <li className={`workout-item ${trainingData[key].completed && 'completed'}`} onClick={() => toggleComplete(key)}>
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  }
  return weekIndex
}

export const endOfMonthHelper = (key, today, weekIndex, todayIndex, trainingData, toggleComplete) => {
  const keyDay = key.substring(3, 5)
  const todayDay = today.substring(3, 5)
  const distanceUp = daysInThisMonth() - (parseInt(todayDay) - parseInt(keyDay))
  const distanceDown = daysInPreviousMonth() - parseInt(keyDay) + parseInt(todayDay)
  if (keyDay < todayDay && distanceUp <= 6 - todayIndex) {
    weekIndex[parseInt(todayIndex) + parseInt(distanceUp)] = (
      <li className={`workout-item ${trainingData[key].completed && 'completed'}`} onClick={() => toggleComplete(key)}>
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  } else if (keyDay > todayDay && distanceDown <= todayIndex) {
    weekIndex[parseInt(todayIndex) - parseInt(distanceDown)] = (
      <li className={`workout-item ${trainingData[key].completed && 'completed'}`} onClick={() => toggleComplete(key)}>
        <h3>{trainingData[key].type}</h3>
        <p>{trainingData[key].description}</p>
      </li>
    )
  } else {
    Object.assign(weekIndex, daysOfWeekHelper(key, today, weekIndex, todayIndex, trainingData, toggleComplete))
  }
  return weekIndex
}

export const daysInThisMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
}

export const daysInPreviousMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 0).getDate()
}

export const highlightHelper = (day) => {
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

export const dateHelper = (index) => {
  const endOfMonthIndex = ['25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6']
  const date = new Date()
  const day = date.getDate()
  const todayIndex = date.getDay()
  let adjustment

  if (!endOfMonthIndex.includes(day.toString())) {
    if (index < todayIndex) {
      adjustment = day - (todayIndex - index)
    } else {
      adjustment = day + (index - todayIndex)
    }
  } else {
    if (index < todayIndex && todayIndex - index >= day) {
      adjustment = daysInPreviousMonth() - ((todayIndex - day) - index)
    } else if (index > todayIndex && (index - todayIndex) >= (daysInThisMonth() - day)) {
      adjustment = (index - todayIndex) - (daysInThisMonth()  - day)
    } else {
      adjustment = day - (todayIndex - index)
    }
  }
  return adjustment
}