import React, { Component } from 'react'
import { addDataThunk } from '../../thunks/addData'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class AscentForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      location: '',
      caption: '',
      grade: '',
      ascentAdded: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const ascent = {
      user_id: this.props.user.id,
      name: this.state.name,
      location: this.state.location,
      grade: this.state.grade,
      caption: this.state.caption
    }
    const result = await this.props.addAscent(ascent, 'ascent')
    if (result) {
      this.setState({ ascentAdded: true })
    }
  }

  render() {
    const { name, location, caption, grade, ascentAdded } = this.state
    const { user } = this.props

    if (ascentAdded || !user.name) { return <Redirect to='/ascents' /> }

    return (
      <form className="ascent-form" onSubmit={this.handleSubmit}>
        <h2>ADD ASCENT</h2>
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
        <textarea name="caption"
          value={caption}
          onChange={this.handleChange}
          placeholder="caption"
          maxLength="500"
        />
        <button>Add Ascent</button>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.currentUser,
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  addAscent: (ascent, type) => dispatch(addDataThunk(ascent, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(AscentForm)

AscentForm.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  addAscent: PropTypes.func.isRequired
}