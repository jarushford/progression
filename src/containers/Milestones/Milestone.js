import React from 'react'
import { connect } from 'react-redux'
import { deleteMilestoneThunk } from '../../thunks/deleteMilestone'

function Milestone({ milestone_date, caption, id, user_id, project_id, deleteMilestone }) {
  return (
    <article className="milestone">
      <div>
        <h3>{milestone_date}</h3>
        <i className="fas fa-times" onClick={() => deleteMilestone(id, project_id, user_id)} />
      </div>
      <p className="milestone-cap">{caption}</p>
    </article>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteMilestone: (id, project_id, user_id) => dispatch(deleteMilestoneThunk(id, project_id, user_id))
})

export default connect(null, mapDispatchToProps)(Milestone)