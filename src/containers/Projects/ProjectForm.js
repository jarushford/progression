import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDataThunk } from '../../thunks/addData'
import { Redirect } from 'react-router-dom'

class ProjectForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      location: '',
      caption: '',
      grade: '',
      priority: '',
      season: '',
      moves_total: 0,
      moves_done: 0,
      high_point: 0,
      projectAdded: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const project = {
      user_id: this.props.user.id,
      name: this.state.name,
      location: this.state.location,
      grade: this.state.grade,
      priority: this.state.priority,
      season: this.state.season,
      moves_total: this.state.moves_total,
      moves_done: this.state.moves_done,
      high_point: this.state.high_point,
      caption: this.state.caption
    }
    const result = await this.props.addProject(project, 'project')
    if (result) {
      this.setState({ projectAdded: true })
    }
  }

  render() {
    const { name, location, caption, grade, priority, season, projectAdded, moves_total, moves_done, high_point } = this.state
    const { user } = this.props

    if (projectAdded || !user.name) { return <Redirect to='/projects' /> }

    return (
      <form className="project-form" onSubmit={this.handleSubmit}>
        <h2>ADD PROJECT</h2>
        <input name="name"
          value={name}
          onChange={this.handleChange}
          placeholder="name"
          autoFocus={true}
        />
        <input name="location"
          value={location}
          onChange={this.handleChange}
          placeholder="location"
        />
        <select id="grade"
          name="grade"
          value={grade}
          onChange={this.handleChange}
        >
          <option value="--"> grade </option>
          <option value="0"> V0 / 4 </option>
          <option value="1"> V1 / 5 </option>
          <option value="2"> V2 / 5+ </option>
          <option value="3"> V3 / 6A </option>
          <option value="4"> V4 / 6B </option>
          <option value="5"> V5 / 6C </option>
          <option value="6"> V6 / 7A </option>
          <option value="7"> V7 / 7A+ </option>
          <option value="8"> V8 / 7B+ </option>
          <option value="9"> V9 / 7C </option>
          <option value="10"> V10 / 7C+ </option>
          <option value="11"> V11 / 8A </option>
          <option value="12"> V12 / 8A+ </option>
          <option value="13"> V13 / 8B </option>
          <option value="14"> V14 / 8B+ </option>
          <option value="15"> V15 / 8C </option>
          <option value="16"> V16 / 8C+ </option>
        </select>
        <select id="priority"
          name="priority"
          value={priority}
          onChange={this.handleChange}
        >
          <option value="--"> priority </option>
          <option value="0"> 0 (meh) </option>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
          <option value="5"> 5 </option>
          <option value="6"> 6 </option>
          <option value="7"> 7 </option>
          <option value="8"> 8 </option>
          <option value="9"> 9 </option>
          <option value="10"> 10 (this is the only thing I want to climb) </option>
        </select>
        <input name="season"
          value={season}
          onChange={this.handleChange}
          placeholder="season"
        />
        <label>
          # of Moves
          <input
            type="number"
            name="moves_total"
            value={moves_total}
            min="0"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Moves Done
          <input
            type="number"
            name="moves_done"
            value={moves_done}
            min="0"
            onChange={this.handleChange}
          />
        </label>
        <label>
          High Point
          <input
            type="number"
            name="high_point"
            value={high_point}
            min="0"
            onChange={this.handleChange}
          />
        </label>
        <textarea name="caption"
          value={caption}
          onChange={this.handleChange}
          placeholder="caption"
          maxLength="500"
        />
        <button>Add Project</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  addProject: (project, type) => dispatch(addDataThunk(project, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm)

