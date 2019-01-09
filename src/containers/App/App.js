import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import MilestoneForm from '../Milestones/MilestoneForm'
import ProjectPage from '../ProjectPage/ProjectPage'
import TrainingAll from '../TrainingAll/TrainingAll'
import TrainingForm from '../Training/TrainingForm'
import ProjectForm from '../Projects/ProjectForm'
import JournalForm from '../Journal/JournalForm'
import AscentForm from '../Ascents/AscentForm'
import Projects from '../Projects/Projects'
import Training from '../Training/Training'
import EditForm from '../Projects/EditForm'
import Ascents from '../Ascents/Ascents'
import { connect }  from 'react-redux'
import Header from '../Header/Header'
import Login from '../Login/Login'
import PropTypes from 'prop-types'
import Error from '../Error/Error'
import Home from '../Home/Home'
import '../../main.scss'

export class App extends Component {

  render() {
    const { projects, disciplineBoulder, error } = this.props

    if (error) {
      return (
        <div className={`app ${disciplineBoulder && 'boulder'}`}>
          <Header />
          <Error />
        </div>
      )
    }

    if (!projects) {
      return <h1 className="no-data-msg">Loading...</h1>
    }

    return (
      <div className={`app ${disciplineBoulder && 'boulder'}`}>
        <Header />
        <Home />
        <Switch>
          <Route exact path="/" />
          <Route path="/login" component={Login} />
          <Route exact path="/training" component={Training} />
          <Route path="/training/add" component={TrainingForm} />
          <Route path="/training/all" component={TrainingAll} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/add" component={ProjectForm} />
          <Route path="/projects/edit" component={EditForm} />
          <Route path="/projects/:id" render={({ match }) => {
            const { id } = match.params
            const currentProject = projects.find(project =>
              project.id === parseInt(id)
            )
            return <ProjectPage project={currentProject} />
          }}/>
          <Route exact path="/ascents" component={Ascents} />
          <Route path="/ascents/add" component={AscentForm} />
          <Route path="/milestones/add" component={MilestoneForm} />
          <Route path="/journal/add" component={JournalForm} />
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects,
  disciplineBoulder: state.disciplineBoulder,
  error: state.error
})

export default withRouter(connect(mapStateToProps)(App))

App.propTypes = {
  projects: PropTypes.array,
  disciplineBoulder: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}

App.defaultProps = {
  projects: null
}
