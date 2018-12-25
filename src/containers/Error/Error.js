import React from 'react'
import { connect } from 'react-redux'
import { clearError } from '../../actions'
import '../../main.scss'

function Error({ error, clearError }) {
  return (
    <section className="error">
      <h2>{error}</h2>
      <h2>Something seems to have gone wrong!</h2>
      <button onClick={clearError}>Return to site</button>
    </section>
  )
}

const mapStateToProps = (state) => ({
  error: state.error
})

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Error)