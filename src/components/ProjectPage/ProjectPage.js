import React from 'react'
import gradeConverter from '../../utils/gradeConverter'
import { Link } from 'react-router-dom'
import { dataHelper, priorityHelper } from '../../utils/projectHelpers'

export default function ProjectPage({ project = { sessions: [] } }) {
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
            <button className="add-milestone">Add Milestone</button>
            <button className="add-session">Add Session</button>
          </div>
        </div>
      </div>
      <div className="project-entries">
        <h1 className="proj-milestones">Milestones +</h1>

        <h1 className="proj-journal">Journal +</h1>

      </div>
    </section>
  )
}
