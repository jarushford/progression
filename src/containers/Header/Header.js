import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import '../../main.scss'
import { connect } from 'react-redux';
import { logoutUser, clearAscents, clearProjects } from '../../actions'

function Header({ currentUser, logoutUser, clearAscents, clearProjects }) {
  let userButton

  if (currentUser.name) {
    userButton = (
      <div className="current-user">
        <div>
          <h2><i className="fas fa-caret-down" /> Welcome, {currentUser.name}!</h2>
          <h2 onClick={() => {
            clearAscents()
            clearProjects()
            logoutUser()
          }}>Log Out</h2>
        </div>
        <i className="fas fa-user-circle" />
      </div>
    )
  } else {
    userButton = (
      <Link to='/login'><button>Login / Sign Up</button></Link>
    )
  }

    return (
      <div className="header">
        <NavLink to="/">
          <div className="logo" />
        </NavLink>
        <NavLink to="/training" className="nav-item"> TRAINING </NavLink>
        <NavLink to="/projects" className="nav-item"> PROJECTS </NavLink>
        <NavLink to="/ascents" className="nav-item"> ASCENTS </NavLink>
        {userButton}
      </div>
    )
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  clearAscents: () => dispatch(clearAscents()),
  clearProjects: () => dispatch(clearProjects()),
  logoutUser: () => dispatch(logoutUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))