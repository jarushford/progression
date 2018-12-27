import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import gradeConverter from '../../utils/gradeConverter'
import { connect }  from 'react-redux';
import { uid } from 'react-uid'
import { deleteDataThunk } from '../../thunks/deleteData'
import '../../main.scss'
import { setCurrentProject } from '../../actions';
import { fetchMilestonesThunk } from '../../thunks/fetchMilestones'
import { fetchJournalThunk } from '../../thunks/fetchJournal';

function Projects({ projects, deleteProject, user, setCurrentProject, fetchMilestones, fetchJournal }) {
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
                await fetchMilestones(user.id, project.id)
                await fetchJournal(user.id, project.id)
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
  fetchMilestones: (id, project_id) => dispatch(fetchMilestonesThunk(id, project_id)),
  fetchJournal: (id, project_id) => dispatch(fetchJournalThunk(id, project_id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projects))
