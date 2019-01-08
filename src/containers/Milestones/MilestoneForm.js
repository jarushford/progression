import React, { Component } from 'react'
import { addDataThunk } from '../../thunks/addData'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class MilestoneForm extends Component {
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
    const result = await this.props.addMilestone(milestone, 'milestone')
    if (result) {
      this.setState({ milestoneAdded: true })
    }
  }

  render() {
    const { caption, milestoneAdded } = this.state

    if (milestoneAdded) { return <Redirect to={`/projects/${this.props.project}`} /> }

    return (
      <form className="milestone-form" onSubmit={this.handleSubmit}>
        <h2>ADD MILESTONE</h2>
        <textarea name="caption"
          value={caption}
          onChange={this.handleChange}
          placeholder="caption"
          maxLength="200"
          className="milestone-caption"
        />
        <button>Add Milestone</button>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.currentUser,
  project: state.currentProject
})

export const mapDispatchToProps = (dispatch) => ({
  addMilestone: (milestone, type) => dispatch(addDataThunk(milestone, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneForm)

MilestoneForm.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.number.isRequired,
  addMilestone: PropTypes.func.isRequired
}