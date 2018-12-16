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
      userHomeSetting: ''
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

  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/train" />
          <Route path="/projects" />
          <Route path="/ascents" />
          <Route path="" />
        </Switch>
      </div>
    )
  }
}
