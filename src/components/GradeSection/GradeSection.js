import React from 'react'
import gradeConverter from '../../assets/gradeConverter'
import { deleteAscentThunk } from '../../thunks/deleteAscent'
import { connect } from 'react-redux'
import '../../main.scss'

function GradeSection({ grade, ascents, user, deleteAscent }) {
  const ascentsRender = ascents.map(ascent => {
    return (
      <article className="ascent">
        <div>
          <div className="content-section">
            <h2 className="ascent-name">{ascent.name}</h2>
            <h5 className="ascent-location">{ascent.location}</h5>
          </div>
          <i className="fas fa-times" onClick={() => deleteAscent(ascent.id, user.id)}></i>
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

const mapStateToProps = (state) => ({
  user: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  deleteAscent: (ascent_id, user_id) => dispatch(deleteAscentThunk(ascent_id, user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GradeSection)