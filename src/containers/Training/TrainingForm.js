import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addWorkoutThunk } from '../../thunks/addWorkout'
import { Redirect } from 'react-router-dom'

class TrainingForm extends Component {
  constructor() {
    super()
    this.state = {
      day: '1',
      month: '1',
      year: '2018',
      type: '',
      description: '',
      workoutAdded: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const workout_date = `${this.state.month}/${this.state.day}/${this.state.year}`
    const workout = {
      user_id: this.props.user.id,
      workout_date,
      description: this.state.description,
      type: this.state.type
    }
    await this.props.addWorkout(workout)
    this.setState({ workoutAdded: true })
  }

  render() {
    const { day, month, year, description, type, workoutAdded } = this.state

    if (workoutAdded) { return <Redirect to='/training/all' /> }

    return (
      <form className="training-form" onSubmit={this.handleSubmit}>
        <h2>ADD WORKOUT</h2>
        <select id="year"
          name="year"
          value={year}
          onChange={this.handleChange}
        >
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
        <select id="month"
          name="month"
          value={month}
          onChange={this.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select id="day"
          name="day"
          value={day}
          onChange={this.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <select id="type"
          name="type"
          value={type}
          onChange={this.handleChange}
        >
          <option value="--"> -- </option>
          <option value="Power"> Power </option>
          <option value="Endurance"> Endurance </option>
          <option value="Fitness"> Fitness </option>
          <option value="Hangboard"> Hangboard </option>
          <option value="Campus"> Campus </option>
          <option value="Power Endurance"> Power Endurance </option>
        </select>
        <textarea name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="description"
          maxLength="100"
        />
        <button>Add Workout</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  addWorkout: (ascent) => dispatch(addWorkoutThunk(ascent))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainingForm)

