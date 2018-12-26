import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMilestoneThunk } from '../../thunks/addMilestone'
import { Redirect } from 'react-router-dom'

class MilestoneForm extends Component {
  constructor() {
    super()
    this.state = {
      caption: '',
      milestoneAdded: false
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
    const milestone = {
      caption: this.state.caption,
      milestone_date: today,
      user_id: user.id,
      project_id: project
    }
    const result = await this.props.addMilestone(milestone)
    if (result) {
      this.setState({ milestoneAdded: true })
    }
  }

  render() {
    const { caption, milestoneAdded } = this.state

    if (milestoneAdded) { return <Redirect to='/projects/' /> }

    return (
      <form className="milestone-form" onSubmit={this.handleSubmit}>
        <h2>ADD MILESTONE</h2>
        <textarea name="caption"
          value={caption}
          onChange={this.handleChange}
          placeholder="caption"
          maxLength="200"
        />
        <button>Add Milestone</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  project: state.currentProject
})

const mapDispatchToProps = (dispatch) => ({
  addMilestone: (ascent) => dispatch(addMilestoneThunk(ascent))
})

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneForm)

