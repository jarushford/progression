import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import gradeConverter from '../../utils/gradeConverter'
import { connect }  from 'react-redux';
import { uid } from 'react-uid'
import { deleteDataThunk } from '../../thunks/deleteData'
import '../../main.scss'
import { setCurrentProject } from '../../actions';
import { fetchDataThunk } from '../../thunks/fetchData'

function Projects({ projects, deleteProject, user, setCurrentProject, fetchData }) {
  let projectsRender

  if (!user.name) {
    return <h1 className="no-user-msg">Log in or sign up to add projects</h1>
  }

  if (!projects.length) {
    projectsRender = <h1 className="no-data-msg">You have no saved projects</h1>
  } else {
    projectsRender = projects.map(project => {
      return (
          <article className="project" key={uid(project)}>
            <div>
            <Link
              to={`/projects/${project.id}`}
              className="project-link"
              onClick={async () => {
                await fetchData(user.id, project.id, 'journal')
                await fetchData(user.id, project.id, 'milestone')
                setCurrentProject(project.id)
              }}
            >
              <h2 className="project-name">{project.name}</h2>
            </Link>
              <h5 className="project-grade">{gradeConverter[project.grade]}</h5>
            </div>
            <h5 className="project-location">{project.location}</h5>
            <i className="fas fa-times" onClick={() => deleteProject(project.id, user.id, null, 'project')}></i>
          </article>
      )
    })
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
  deleteProject: (item_id, user_id, project_id, type) => dispatch(deleteDataThunk(item_id, user_id, project_id, type)),
  setCurrentProject: (id) => dispatch(setCurrentProject(id)),
  fetchData: (id, project_id, type) => dispatch(fetchDataThunk(id, project_id, type))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projects))
