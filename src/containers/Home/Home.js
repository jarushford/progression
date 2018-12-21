import React from 'react'
import '../../main.scss'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as ACTIONS from '../../actions/index'

function Home({ disciplineBoulder, toggleDiscipline }) {
  let caption
  if (disciplineBoulder) {
    caption = (
      <div className="caption">
        <h2>Jimmy Webb | Livin' Large | V15</h2>
        <h3>Rocklands, ZA</h3>
      </div>
    )
  } else {
    caption = (
      <div className="caption">
        <h2>Margo Hayes | La Rambla | 5.15a</h2>
        <h3>Siurana, ES</h3>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="switcher">
        <input
          type="radio"
          name="style"
          id="sport"
          defaultChecked={!disciplineBoulder}
          onClick={() => toggleDiscipline(false)}
        />
        <label htmlFor="sport" className="sport-label">sport</label>
        <input
          type="radio"
          name="style"
          id="boulder"
          defaultChecked={disciplineBoulder}
          onClick={() => toggleDiscipline(true)}/>
        <label htmlFor="boulder" className="boulder-label">boulder</label>
      </div>
      {caption}
    </div>
  )
}

const mapStateToProps = (state) => ({
  disciplineBoulder: state.disciplineBoulder
})

const mapDispatchToProps = (dispatch) => ({
  toggleDiscipline: (isBoulder) => dispatch(ACTIONS.toggleDiscipline(isBoulder))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))