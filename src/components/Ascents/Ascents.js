import React from 'react'
import GradeSection from '../GradeSection/GradeSection'
import '../../main.scss'

export default function Ascents({ ascents }) {
  const gradeDivisions = ascents.reduce((grades, ascent) => {
    if (!grades[ascent.grade]) {
      grades[ascent.grade] = []
    }
    grades[ascent.grade].push(ascent)
    return grades
  }, {})
  const gradeKeys = Object.keys(gradeDivisions).sort((a, b) => {
    return b - a
  })
  const gradeRender = gradeKeys.map(grade => {
    return (
      <GradeSection
        grade={grade}
        ascents={gradeDivisions[grade]}
      />
    )
  })

  return (
    <section className="ascents">
      <div className="ascents-header">
        <h1 className="ascents-title">ASCENTS</h1>
        <button className="add-ascent">Add Ascent</button>
      </div>
      {gradeRender}
    </section>
  )
}