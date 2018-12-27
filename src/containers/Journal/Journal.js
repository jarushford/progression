import React from 'react'
import { connect } from 'react-redux'
import { deleteJournalThunk } from '../../thunks/deleteJournal'

function Journal({ journal_date, entry, id, user_id, project_id, deleteJournal }) {
  return (
    <article className="journal">
      <div>
        <h3>{journal_date}</h3>
        <i className="fas fa-times" onClick={() => deleteJournal(id, project_id, user_id)} />
      </div>
      <p className="milestone-cap">{entry}</p>
    </article>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteJournal: (id, project_id, user_id) => dispatch(deleteJournalThunk(id, project_id, user_id))
})

export default connect(null, mapDispatchToProps)(Journal)