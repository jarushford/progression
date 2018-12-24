import React from 'react'
import gradeConverter from '../../assets/gradeConverter'
import { Link } from 'react-router-dom'

export default function ProjectPage({ project = { sessions: [] } }) {
  let sentStatus
  if (project.sent) {
    sentStatus = <h3>SENT!</h3>
  } else {
    sentStatus = <h3></h3>
  }

  return (
    <section className="project-page">
      <div className="project-header">
        <h1 className="proj-name">{project.name}</h1>
        <h5 className="proj-grade">{gradeConverter[project.grade]}</h5>
        <h5 className="project-priority">{project.priority}</h5>
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
            <h3 className="season">Season: {project.season}</h3>
            <div className="data-container">
              <div className="high-point">
                <div className={dataHelper(project.high_point, project.moves_total)}/>
              </div>
              <div className="moves-done">
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


////////////////////////////
////////////////////////////


const dataHelper = (progress, total) => {
  const classes = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten'
  }
  const index = Math.ceil(progress / total * 10)
  return classes[index]
}