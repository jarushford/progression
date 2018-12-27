import React, { Component } from 'react'
import gradeConverter from '../../utils/gradeConverter'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { dataHelper, priorityHelper } from '../../utils/projectHelpers'
import Milestone from '../Milestones/Milestone'
import { uid } from 'react-uid';

class ProjectPage extends Component {
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
    const { project, user, milestones } = this.props
    const { milestonesOpen, journalOpen } = this.state
    
    if (!user.name) {
      return <h1 className="no-user-msg">Log in or sign up to add projects</h1>
    }

    if (!project) {
      return <h1 className="no-user-msg">You have no projects</h1>
    }

    let sentStatus
    if (project.sent) {
      sentStatus = <h3>SENT!</h3>
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
          {sentStatus}
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
              <button className="add-progress">Add Progress</button>
              <Link to='/milestones/add'>
                <button className="add-milestone">Add Milestone</button>
              </Link>
              <button className="add-session">Add Session</button>
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
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  milestones: state.milestones,
  user: state.currentUser
})

export default withRouter(connect(mapStateToProps)(ProjectPage))
