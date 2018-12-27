import React from 'react'
import GradeSection from '../GradeSection/GradeSection'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import '../../main.scss'
import { uid } from 'react-uid';

function Ascents({ ascents, user }) {
  let gradeRender

  if (!user.name) {
    return <h1 className="no-user-msg">Log in or sign up to add ascents</h1>
  }

  if (!ascents.length) {
    gradeRender = <h1 className="no-data-msg">You have no saved ascents</h1>
  } else {
    const gradeDivisions = ascents.reduce((grades, ascent) => {
      if (!grades[ascent.grade]) {
        grades[ascent.grade] = []
      }
      grades[ascent.grade].push(ascent)
      return grades
    }, {})

    const gradeKeys = Object.keys(gradeDivisions).sort((a, b) => b - a)

    gradeRender = gradeKeys.map(grade => {
      return (
        <GradeSection
          grade={grade}
          ascents={gradeDivisions[grade]}
          key={uid(grade)}
        />
      )
    })
  }

  return (
    <section className="ascents">
      <div className="ascents-header">
        <h1 className="ascents-title">ASCENTS</h1>
        <Link to="/ascents/add">
          <button className="add-ascent">Add Ascent</button>
        </Link>
      </div>
      {gradeRender}
    </section>
  )
}

const mapStateToProps = (state) => ({
  ascents: state.ascents,
  user: state.currentUser
})

export default withRouter(connect(mapStateToProps)(Ascents))