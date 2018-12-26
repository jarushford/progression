import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Training from '../Training/Training'
import TrainingForm from '../Training/TrainingForm'
import TrainingAll from '../TrainingAll/TrainingAll'
import Ascents from '../Ascents/Ascents'
import AscentForm from '../Ascents/AscentForm'
import Projects from '../Projects/Projects'
import ProjectForm from '../Projects/ProjectForm'
import ProjectPage from '../ProjectPage/ProjectPage'
import Login from '../Login/Login'
import Error from '../Error/Error'
import MilestoneForm from '../Milestones/MilestoneForm'
import { connect }  from 'react-redux';
import '../../main.scss'

class App extends Component {

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
      return <div>Loading...</div>
    }

    return (
      <div className={`app ${disciplineBoulder && 'boulder'}`}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/training" component={Training} />
          <Route path="/training/add" component={TrainingForm} />
          <Route path="/training/all" component={TrainingAll} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/add" component={ProjectForm} />
          <Route path="/projects/:name" render={({ match }) => {
            const { name } = match.params
            const currentProject = projects.find(project =>
              project.name === name
            )
            return <ProjectPage project={currentProject} />
          }}/>
          <Route exact path="/ascents" component={Ascents} />
          <Route path="/ascents/add" component={AscentForm} />
          <Route path="/milestones/add" component={MilestoneForm} />
          <Route path="" component={Error} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  disciplineBoulder: state.disciplineBoulder,
  error: state.error
})

export default withRouter(connect(mapStateToProps)(App))
