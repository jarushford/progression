import React from 'react'
import gradeConverter from '../../assets/gradeConverter'
import '../../main.scss'

export default function Projects({ projects }) {
  const projectsRender = projects.map(project => {
    return (
      <article className="project">
        <div>
          <h2 className="project-name">{project.name}</h2>
          <h5 className="project-grade">{gradeConverter[project.grade]}</h5>
        </div>
        <h5 className="project-location">{project.location}</h5>
      </article>
    )
  })

  return (
    <section className="projects">
      <div className="projects-header">
        <h1 className="projects-title">PROJECTS</h1>
        <button className="add-project">Add Project</button>
      </div>
      {projectsRender}
    </section>
  )
}
