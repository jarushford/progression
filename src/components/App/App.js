import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Home from '../Home/Home'
import sampleUserData from '../../assets/sampleUserData'
import '../../main.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userTraining: {},
      userProjects: {},
      userAscents: {},
      boulder: true,
    }
  }

  componentDidMount() {
    this.setState({
      userTraining: sampleUserData.trainingData,
      userProjects: sampleUserData.projects,
      userAscents: sampleUserData.ascents,
      userHomeSetting: sampleUserData.homeSetting
    })
  }

  toggleHomeScreen = (e) => {
    this.setState({
      boulder: eval(e.target.value)
    })
  }

  render() {
    const { boulder } = this.state 
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
          <Route path="/train" />
          <Route path="/projects" />
          <Route path="/ascents" />
          <Route path="" />
        </Switch>
      </div>
    )
  }
}
