import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../main.scss'

export default function App() {
    return (
      <div className="header">
        <NavLink to="/">
          <div className="logo" />
        </NavLink>
        <NavLink to="/training" className="nav-item"> TRAINING </NavLink>
        <NavLink to="/projects" className="nav-item"> PROJECTS </NavLink>
        <NavLink to="/ascents" className="nav-item"> ASCENTS </NavLink>
      </div>
    )
}