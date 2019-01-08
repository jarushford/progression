import React, { Component } from 'react'
import { updateDataThunk } from '../../thunks/updateData'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class EditForm extends Component {
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
      projectEdited: false
    }
  }

  componentDidMount() {
    const project = this.props.projects.find(project => {
      return project.id === this.props.project
    })
    if (project) {
      this.setState({
        name: project.name,
        location: project.location,
        grade: project.grade,
        priority: project.priority,
        season: project.season,
        moves_total: project.moves_total,
        moves_done: project.moves_done,
        high_point: project.high_point,
        caption: project.caption
      })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const project = {
      id: this.props.project,
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
    const result = await this.props.editProject(project, 'project')
    if (result) {
      this.setState({ projectEdited: true })
    }
  }

  render() {
    const { name, location, caption, grade, priority, season, projectEdited, moves_total, moves_done, high_point } = this.state
    const { user, project, disciplineBoulder } = this.props
    let gradeInput

    if (disciplineBoulder) {
      gradeInput = (
        <select id="grade"
          name="grade"
          value={grade}
          onChange={this.handleChange}
        >
          <option value="--"> -- </option>
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
      )
    } else {
      gradeInput = (
        <select id="grade"
          name="grade"
          value={grade}
          onChange={this.handleChange}
        >
          <option value="--"> -- </option>
          <option value="5600"> 5.6 / 5a </option>
          <option value="5700"> 5.7 / 5b </option>
          <option value="5800"> 5.8 / 5c </option>
          <option value="5900"> 5.9 / 6a </option>
          <option value="5101"> 5.10a / 6a+ </option>
          <option value="5102"> 5.10b / 6a+ </option>
          <option value="5103"> 5.10c / 6b </option>
          <option value="5104"> 5.10d / 6b+ </option>
          <option value="5111"> 5.11a / 6c </option>
          <option value="5112"> 5.11b / 6c+ </option>
          <option value="5113"> 5.11c / 7a </option>
          <option value="5114"> 5.11d / 7a+ </option>
          <option value="5121"> 5.12a / 7b </option>
          <option value="5122"> 5.12b / 7b+ </option>
          <option value="5123"> 5.12c / 7c </option>
          <option value="5124"> 5.12d / 7c+ </option>
          <option value="5131"> 5.13a / 7c+ </option>
          <option value="5132"> 5.13b / 8a </option>
          <option value="5133"> 5.13c / 8a+ </option>
          <option value="5134"> 5.13d / 8b </option>
          <option value="5141"> 5.14a / 8b+ </option>
          <option value="5142"> 5.14b / 8c </option>
          <option value="5143"> 5.14c / 8c+ </option>
          <option value="5144"> 5.14d / 9a </option>
          <option value="5151"> 5.15a / 9a+ </option>
          <option value="5152"> 5.15b / 9b</option>
          <option value="5153"> 5.15c / 9b+ </option>
        </select>
      )
    }

    if (projectEdited || !user.name) { return <Redirect to={`/projects/${project}`} /> }

    return (
      <form className="project-form" onSubmit={this.handleSubmit}>
        <h2>EDIT</h2>
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
        {gradeInput}
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
            max={this.state.moves_total}
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
            max={this.state.moves_total}
            onChange={this.handleChange}
          />
        </label>
        <textarea name="caption"
          value={caption}
          onChange={this.handleChange}
          placeholder="caption"
          maxLength="500"
        />
        <button>Save</button>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.currentUser,
  project: state.currentProject,
  projects: state.projects,
  disciplineBoulder: state.disciplineBoulder
})

export const mapDispatchToProps = (dispatch) => ({
  editProject: (project) => dispatch(updateDataThunk(project, 'project'))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)

EditForm.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.number.isRequired,
  projects: PropTypes.array.isRequired,
  disciplineBoulder: PropTypes.bool.isRequired
}