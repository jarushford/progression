import React from 'react'
import { Link } from 'react-router-dom'
import gradeConverter from '../../assets/gradeConverter'
import { uid } from 'react-uid'
import '../../main.scss'

export default function Projects({ projects }) {
  const projectsRender = projects.map(project => {
    const key = uid(project)
    return (
      <Link to={`/projects/${project.name}`} key={key} className="project-link">
        <article className="project">
          <div>
            <h2 className="project-name">{project.name}</h2>
            <h5 className="project-grade">{gradeConverter[project.grade]}</h5>
          </div>
          <h5 className="project-location">{project.location}</h5>
        </article>
      </Link>
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
