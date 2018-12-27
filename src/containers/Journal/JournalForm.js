import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addJournalThunk } from '../../thunks/addJournal'
import { Redirect } from 'react-router-dom'

class JournalForm extends Component {
  constructor() {
    super()
    this.state = {
      entry: '',
      entryAdded: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { user, project } = this.props
    const date = new Date()
    const today = 
    `${('0' + (date.getMonth() + 1)).slice(-2)}/`
      + `${('0' + (date.getDate())).slice(-2)}/`
      + `${date.getFullYear()}`
    const entry = {
      entry: this.state.entry,
      journal_date: today,
      user_id: user.id,
      project_id: project
    }
    const result = await this.props.addJournal(entry)
    if (result) {
      this.setState({ entryAdded: true })
    }
  }

  render() {
    const { entry, entryAdded } = this.state

    if (entryAdded) { return <Redirect to={`/projects/${this.props.project}`} /> }

    return (
      <form className="journal-form" onSubmit={this.handleSubmit}>
        <h2>ADD JOURNAL ENTRY</h2>
        <textarea name="entry"
          value={entry}
          onChange={this.handleChange}
          placeholder="entry"
          maxLength="800"
          className="journal-entry"
        />
        <button>Add Entry</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  project: state.currentProject
})

const mapDispatchToProps = (dispatch) => ({
  addJournal: (ascent) => dispatch(addJournalThunk(ascent))
})

export default connect(mapStateToProps, mapDispatchToProps)(JournalForm)

