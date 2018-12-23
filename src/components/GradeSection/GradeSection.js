import React from 'react'
import gradeConverter from '../../assets/gradeConverter'
import '../../main.scss'

export default function GradeSection({ grade, ascents }) {
  const ascentsRender = ascents.map(ascent => {
    return (
      <article className="ascent">
        <div>
          <h2 className="ascent-name">{ascent.name}</h2>
          <h5 className="ascent-location">{ascent.location}</h5>
        </div>
        <p>{ascent.caption}</p>
      </article>
    )
  })

  return (
    <div className="grade-section">
      <h3>{gradeConverter[grade]}</h3>
      {ascentsRender}
    </div>
  )
}