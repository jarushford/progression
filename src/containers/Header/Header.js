import React from 'react'
import { logoutUser, clearAscents, clearProjects, clearWorkouts } from '../../actions'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../main.scss'

export function Header({ currentUser, logoutUser, clearAscents, clearProjects, clearWorkouts }) {
  let userButton

  if (currentUser.name) {
    userButton = (
      <div>
        <div className="current-user">
          <div>
            <h2><i className="fas fa-caret-down" /> Welcome, {currentUser.name}!</h2>
            <Link
              to="/"
              className="logout-link"
              onClick={() => {
                clearAscents()
                clearProjects()
                clearWorkouts()
                logoutUser()
              }}
            >
              <h2>Log Out</h2>
            </Link>
          </div>
          <i className="fas fa-user-circle" />
        </div>
        <div className="drop-down">
          <input type="checkbox" id="burger-check" />
          <label htmlFor="burger-check" className="burger">
            <div className="burgerbar b1"></div>
            <div className="burgerbar b2"></div>
            <div className="burgerbar b3"></div>
          </label>
          <div className="drop-box">
            <NavLink to="/training" className="nav-item drop-nav"> TRAINING </NavLink>
            <NavLink to="/projects" className="nav-item drop-nav"> PROJECTS </NavLink>
            <NavLink to="/ascents" className="nav-item drop-nav"> ASCENTS </NavLink>
            <Link
              to="/"
              className="logout-link drop-logout"
              onClick={() => {
                clearAscents()
                clearProjects()
                clearWorkouts()
                logoutUser()
              }}
            >
              <h2>Log Out</h2>
            </Link>
          </div>
        </div>
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
        <NavLink to="/training" className="nav-item wide-nav"> TRAINING </NavLink>
        <NavLink to="/projects" className="nav-item wide-nav"> PROJECTS </NavLink>
        <NavLink to="/ascents" className="nav-item wide-nav"> ASCENTS </NavLink>
        {userButton}
      </div>
    )
}

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export const mapDispatchToProps = (dispatch) => ({
  clearAscents: () => dispatch(clearAscents()),
  clearProjects: () => dispatch(clearProjects()),
  clearWorkouts: () => dispatch(clearWorkouts()),
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  clearAscents: PropTypes.func.isRequired,
  clearProjects: PropTypes.func.isRequired,
  clearWorkouts: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
}