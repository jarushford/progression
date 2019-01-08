import React from 'react'
import GradeSection from '../GradeSection/GradeSection'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { uid } from 'react-uid'
import '../../main.scss'

export function Ascents({ ascents, user, disciplineBoulder }) {
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

    const allGradeKeys = Object.keys(gradeDivisions).sort((a, b) => b - a)
    let gradeKeys

    if (disciplineBoulder) {
      gradeKeys = allGradeKeys.filter(key => {
        return parseInt(key) < 17
      })
    } else {
      gradeKeys = allGradeKeys.filter(key => {
        return parseInt(key) > 17
      })
    }

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

export const mapStateToProps = (state) => ({
  ascents: state.ascents,
  user: state.currentUser,
  disciplineBoulder: state.disciplineBoulder
})

export default connect(mapStateToProps)(Ascents)

Ascents.propTypes = {
  ascents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  disciplineBoulder: PropTypes.bool.isRequired
}