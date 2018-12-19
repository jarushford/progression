import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Home from '../../components/Home/Home'
import Training from '../Training/Training'
import Ascents from '../Ascents/Ascents'
import Projects from '../Projects/Projects'
import ProjectPage from '../../components/ProjectPage/ProjectPage'
import sampleUserData from '../../assets/sampleUserData'
import * as ACTIONS from '../../actions/index'
import { connect }  from 'react-redux';
import '../../main.scss'

class App extends Component {

  componentDidMount() {
    const { getTrainingData, getProjects, getAscents } = this.props
    getTrainingData(sampleUserData.trainingData)
    getProjects(sampleUserData.projects)
    getAscents(sampleUserData.ascents)
  }

  render() {
    const { projects, disciplineBoulder } = this.props

    if (!this.props.projects) {
      return <div>Loading...</div>
    }

    return (
      <div className={`app ${disciplineBoulder && 'boulder'}`}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/training" component={Training} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/:name" render={({ match }) => {
            const { name } = match.params
            const currentProject = projects.find(project =>
              project.name === name
            )
            return <ProjectPage project={currentProject} />
          }}/>
          <Route path="/ascents" component={Ascents} />
          <Route path="" />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  disciplineBoulder: state.disciplineBoulder
})

const mapDispatchToProps = (dispatch) => ({
  getTrainingData: (data) => dispatch(ACTIONS.getTrainingData(data)),
  getProjects: (data) => dispatch(ACTIONS.getProjects(data)),
  getAscents: (data) => dispatch(ACTIONS.getAscents(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
