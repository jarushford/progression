import React, { Component } from 'react'

class AscentForm extends Component {
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
    console.log(e.target.value)
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

  }

  render() {
    const { name, location, caption, grade } = this.state
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
          <option value="null"> -- </option>
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
        />
        <button>Add Ascent</button>
      </form>
    )
  }
}

export default AscentForm

