import React from 'react'
import { connect } from 'react-redux'
import { deleteDataThunk } from '../../thunks/deleteData'

function Journal({ journal_date, entry, id, user_id, project_id, deleteJournal }) {
  return (
    <article className="journal">
      <div>
        <h3>{journal_date}</h3>
        <i className="fas fa-times" onClick={() => deleteJournal(id, user_id, project_id, 'journal')} />
      </div>
      <p className="milestone-cap">{entry}</p>
    </article>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteJournal: (item_id, user_id, project_id, type) => dispatch(deleteDataThunk(item_id, user_id, project_id, type))
})

export default connect(null, mapDispatchToProps)(Journal)