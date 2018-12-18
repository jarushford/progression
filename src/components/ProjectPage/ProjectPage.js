import React from 'react'
import gradeConverter from '../../assets/gradeConverter'

export default function ProjectPage({ project = {} }) {
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
        <button className="add-project">Back to Projects</button>
      </div>
      <div className="project-controls">
        <p>{project.caption}</p>
        <div className="progress-meter">
          <h3>Season: {project.season}</h3>
          {project.movesTotal / project.highPoint}
          {project.movesTotal / project.movesDone}
        </div>
        <div className="project-actions">
          <button className="add-progress">Add Progress</button>
          <button className="add-session">Add Session</button>
        </div>
      </div>
      <div className="project-entries">
        {project.sessions.map((session) => {
          return (
            <div className="project-entry">
              <h2>{session.date}</h2>
              <p>{session.entry}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}