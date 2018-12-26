import React from 'react'
import gradeConverter from '../../utils/gradeConverter'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { dataHelper, priorityHelper } from '../../utils/projectHelpers'
import Milestone from '../Milestones/Milestone'
import { uid } from 'react-uid';

function ProjectPage({ project = { sessions: [] }, milestones }) {
  let sentStatus
  if (project.sent) {
    sentStatus = <h3>SENT!</h3>
  } else {
    sentStatus = <div />
  }

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
        <div className="milestone-container">
          <h1 className="proj-milestones">Milestones +</h1>
          {milestones.map(milestone => <Milestone {...milestone} key={uid(milestone)}/>)}
        </div>

        <h1 className="proj-journal">Journal +</h1>

      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  milestones: state.milestones
})

export default withRouter(connect(mapStateToProps)(ProjectPage))
