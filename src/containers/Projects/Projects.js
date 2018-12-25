import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import gradeConverter from '../../assets/gradeConverter'
import { connect }  from 'react-redux';
import { uid } from 'react-uid'
import { deleteProjectThunk } from '../../thunks/deleteProject'
import '../../main.scss'

function Projects({ projects, deleteProject, user }) {
  const projectsRender = projects.map(project => {
    const key = uid(project)
    return (
        <article className="project">
          <div>
          <Link
            to={`/projects/${project.name}`}
            key={key} className="project-link"
          >
            <h2 className="project-name">{project.name}</h2>
          </Link>
            <h5 className="project-grade">{gradeConverter[project.grade]}</h5>
          </div>
          <h5 className="project-location">{project.location}</h5>
          <i className="fas fa-times" onClick={() => deleteProject(project.id, user.id)}></i>
        </article>
    )
  })

  if (!user.name) {
    return <h1 className="no-user-msg">Log in or sign up to add projects</h1>
  }

  return (
    <section className="projects">
      <div className="projects-header">
        <h1 className="projects-title">PROJECTS</h1>
        <Link to='/projects/add'>
          <button className="add-project">Add Project</button>
        </Link>
      </div>
      {projectsRender}
    </section>
  )
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  user: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  deleteProject: (project_id, id) => dispatch(deleteProjectThunk(project_id, id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projects))
