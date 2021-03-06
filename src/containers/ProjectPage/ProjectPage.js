import React, { Component } from 'react'
import { dataHelper, priorityHelper } from '../../utils/projectHelpers'
import gradeConverter from '../../utils/gradeConverter'
import { Link, withRouter } from 'react-router-dom'
import Milestone from '../Milestones/Milestone'
import Journal from '../Journal/Journal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { uid } from 'react-uid'

export class ProjectPage extends Component {
  constructor() {
    super()
    this.state = {
      milestonesOpen: false,
      journalOpen: false
    }
  }

  toggleState = (name) => {
    this.setState({ [name]: !this.state[name] })
  }

  render() {
    const { project, user, milestones, journal } = this.props
    const { milestonesOpen, journalOpen } = this.state
    
    if (!user.name) {
      return <h1 className="no-user-msg">Log in or sign up to add projects</h1>
    }

    if (!project) {
      return <h1 className="no-user-msg">You have no projects</h1>
    }

    let sentStatus
    if (project.high_point / project.moves_total === 1) {
      sentStatus = 'SENT!'
    } else {
      sentStatus = <div />
    }

    let milestonesToggle
    milestonesOpen
      ? milestonesToggle = '-'
      : milestonesToggle = '+'

    let journalToggle
    journalOpen
      ? journalToggle = '-'
      : journalToggle = '+'

    return (
      <section className="project-page">
        <div className="project-header">
          <h1 className="proj-name">{project.name}</h1>
          <h5 className="proj-grade">{gradeConverter[project.grade]}</h5>
          <div className="project-priority">
            <h3>Priority</h3>
            <div className={`priority${priorityHelper(project.priority)}`}/>
          </div>
          <h5 className="proj-location">{project.location}</h5>
          <h1 className="sent">{sentStatus}</h1>
          <Link to='/projects'>
            <button className="add-project">Back to Projects</button>
          </Link>
        </div>
        <div className="project-controls">
          <p className="project-caption">{project.caption}</p>
          <div className="project-right">
            <div className="progress-meter">
              <h3 className="season">Season: <span className="season-span">{project.season}</span></h3>
              <div className="data-container">
                <div className="high-point">
                  <h3>High Point</h3>
                  <div className={dataHelper(project.high_point, project.moves_total)}/>
                </div>
                <div className="moves-done">
                  <h3>Moves Done</h3>
                  <div className={dataHelper(project.moves_done, project.moves_total)}/>
                </div>
              </div>
            </div>
            <div className="project-actions">
              <Link to="/projects/edit">
                <button className="add-progress">Edit Progress</button>
              </Link>
              <Link to='/milestones/add'>
                <button className="add-milestone">Add Milestone</button>
              </Link>
              <Link to='/journal/add'>
                <button className="add-session">Add Journal Entry</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="project-entries">
          <div className={`milestone-container ${milestonesOpen && 'open'}`}>
            <h1 className="proj-milestones"
              onClick={() => this.toggleState('milestonesOpen')}
            >Milestones {milestonesToggle}</h1>
            <div className="collapse-section">
              {milestones.map(milestone => <Milestone {...milestone} key={uid(milestone)}/>)}
            </div>
          </div>
          <div className={`journal-container ${journalOpen && 'open'}`}>
            <h1 className="proj-journal"
              onClick={() => this.toggleState('journalOpen')}
            >Journal {journalToggle}</h1>
            <div className="collapse-section">
              {journal.map(entry => <Journal {...entry} key={uid(entry)}/>)}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  milestones: state.milestones,
  journal: state.journal,
  user: state.currentUser
})

export default withRouter(connect(mapStateToProps)(ProjectPage))

ProjectPage.propTypes = {
  milestones: PropTypes.array.isRequired,
  journal: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}
