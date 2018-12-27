import React from 'react'
import gradeConverter from '../../utils/gradeConverter'
import { deleteDataThunk } from '../../thunks/deleteData'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import '../../main.scss'

function GradeSection({ grade, ascents, user, deleteAscent }) {
  const ascentsRender = ascents.map(ascent => {
    return (
      <article className="ascent" key={uid(ascent)}>
        <div>
          <div className="content-section">
            <h2 className="ascent-name">{ascent.name}</h2>
            <h5 className="ascent-location">{ascent.location}</h5>
          </div>
          <i className="fas fa-times" onClick={() => deleteAscent(ascent.id, user.id, null, 'ascent')}></i>
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
  deleteAscent: (item_id, user_id, project_id, type) => dispatch(deleteDataThunk(item_id, user_id, project_id, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(GradeSection)