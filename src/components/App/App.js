import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Ascents from '../Ascents/Ascents'
import Projects from '../Projects/Projects'
import sampleUserData from '../../assets/sampleUserData'
import '../../main.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userTraining: {},
      userProjects: [],
      userAscents: [],
      boulder: true
    }
  }

  componentDidMount() {
    this.setState({
      userTraining: sampleUserData.trainingData,
      userProjects: sampleUserData.projects,
      userAscents: sampleUserData.ascents
    })
  }

  toggleHomeScreen = (e) => {
    e.target.value === 'true'
      ? this.setState({ boulder: true })
      : this.setState({ boulder: false })
  }

  render() {
    const { boulder, userAscents, userProjects } = this.state 
    return (
      <div className={`app ${boulder && 'boulder'}`}>
        <Header />
        <Switch>
          <Route exact path="/" 
            render={() => (
              <Home
                toggleHomeScreen={this.toggleHomeScreen}
                boulder={boulder}
              />)}
          />
          <Route path="/training" />
          <Route exact path="/projects"
            render={() => <Projects projects={userProjects} />}
          />
          <Route path="/ascents"
            render={() => <Ascents ascents={userAscents} />}
          />
          <Route path="" />
        </Switch>
      </div>
    )
  }
}
