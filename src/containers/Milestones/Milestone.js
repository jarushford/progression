import React from 'react'
import { connect } from 'react-redux'
import { deleteDataThunk } from '../../thunks/deleteData'

function Milestone({ milestone_date, caption, id, user_id, project_id, deleteMilestone }) {
  return (
    <article className="milestone">
      <div>
        <h3>{milestone_date}</h3>
        <i className="fas fa-times" onClick={() => deleteMilestone(id, user_id, project_id, 'milestone')} />
      </div>
      <p className="milestone-cap">{caption}</p>
    </article>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteMilestone: (item_id, user_id, project_id, type) => dispatch(deleteDataThunk(item_id, user_id, project_id, type))
})

export default connect(null, mapDispatchToProps)(Milestone)