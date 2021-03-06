import React, { Component } from 'react'
import { addDataThunk } from '../../thunks/addData'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class TrainingForm extends Component {
  constructor() {
    super()
    this.state = {
      day: '01',
      month: '01',
      year: '2019',
      type: '',
      description: '',
      workoutAdded: false
    }
  }

  componentDidMount() {
    const date = new Date()
    const month = ('0' + (date.getMonth() + 1)).slice(-2).toString()
    const day = ('0' + (date.getDate())).slice(-2).toString()
    const year = date.getFullYear().toString()
    this.setState({
      day,
      month,
      year
    })
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
      type: this.state.type,
      completed: false
    }
    const result = await this.props.addWorkout(workout, 'workout')
    if (result) {
      this.setState({ workoutAdded: true })
    }
  }

  render() {
    const { day, month, year, description, type, workoutAdded } = this.state
    const { user } = this.props

    if (workoutAdded || !user.name) { return <Redirect to='/training/all' /> }

    const date = new Date()
    const currentYear = date.getFullYear()
    const longMonths = ["1", "3", "5", "7", "8", "10", "12"]
    let isLong
    let notFeb

    if (month !== "2") {
      notFeb = <option value="30">30</option>
    }

    if (longMonths.includes(month)) {
      isLong = <option value="31">31</option>
    }

    return (
      <form className="training-form" onSubmit={this.handleSubmit}>
        <h2>ADD WORKOUT</h2>
        <select id="year"
          name="year"
          value={year}
          onChange={this.handleChange}
        >
          <option value={currentYear}>{currentYear}</option>
          <option value={currentYear + 1}>{currentYear + 1}</option>
          <option value={currentYear + 2}>{currentYear + 2}</option>
          <option value={currentYear + 3}>{currentYear + 3}</option>
          <option value={currentYear + 4}>{currentYear + 4}</option>
        </select>
        <select id="month"
          name="month"
          value={month}
          onChange={this.handleChange}
        >
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select id="day"
          name="day"
          value={day}
          onChange={this.handleChange}
        >
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
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
          {notFeb}
          {isLong}
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

export const mapStateToProps = (state) => ({
  user: state.currentUser
})

export const mapDispatchToProps = (dispatch) => ({
  addWorkout: (workout, type) => dispatch(addDataThunk(workout, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainingForm)

TrainingForm.propTypes = {
  user: PropTypes.object.isRequired,
  addWorkout: PropTypes.func.isRequired
}
